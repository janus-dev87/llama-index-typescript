import { NodeWithScore, TextNode } from "./Node";
import {
  BaseQuestionGenerator,
  LLMQuestionGenerator,
  SubQuestion,
} from "./QuestionGenerator";
import { Response } from "./Response";
import { CompactAndRefine, ResponseSynthesizer } from "./ResponseSynthesizer";
import { BaseRetriever } from "./Retriever";
import { v4 as uuidv4 } from "uuid";
import { Event } from "./callbacks/CallbackManager";
import { ServiceContext, serviceContextFromDefaults } from "./ServiceContext";
import { QueryEngineTool, ToolMetadata } from "./Tool";

export interface BaseQueryEngine {
  aquery(query: string, parentEvent?: Event): Promise<Response>;
}

export class RetrieverQueryEngine implements BaseQueryEngine {
  retriever: BaseRetriever;
  responseSynthesizer: ResponseSynthesizer;

  constructor(retriever: BaseRetriever) {
    this.retriever = retriever;
    const serviceContext: ServiceContext | undefined =
      this.retriever.getServiceContext();
    this.responseSynthesizer = new ResponseSynthesizer({ serviceContext });
  }

  async aquery(query: string, parentEvent?: Event) {
    const _parentEvent: Event = parentEvent || {
      id: uuidv4(),
      type: "wrapper",
      tags: ["final"],
    };
    const nodes = await this.retriever.aretrieve(query, _parentEvent);
    return this.responseSynthesizer.asynthesize(query, nodes, parentEvent);
  }
}

export class SubQuestionQueryEngine implements BaseQueryEngine {
  responseSynthesizer: ResponseSynthesizer;
  questionGen: BaseQuestionGenerator;
  queryEngines: Record<string, BaseQueryEngine>;
  metadatas: ToolMetadata[];

  constructor(init: {
    questionGen: BaseQuestionGenerator;
    responseSynthesizer: ResponseSynthesizer;
    queryEngineTools: QueryEngineTool[];
  }) {
    this.questionGen = init.questionGen;
    this.responseSynthesizer =
      init.responseSynthesizer ?? new ResponseSynthesizer();
    this.queryEngines = init.queryEngineTools.reduce<
      Record<string, BaseQueryEngine>
    >((acc, tool) => {
      acc[tool.metadata.name] = tool.queryEngine;
      return acc;
    }, {});
    this.metadatas = init.queryEngineTools.map((tool) => tool.metadata);
  }

  static fromDefaults(init: {
    queryEngineTools: QueryEngineTool[];
    questionGen?: BaseQuestionGenerator;
    responseSynthesizer?: ResponseSynthesizer;
    serviceContext?: ServiceContext;
  }) {
    const serviceContext =
      init.serviceContext ?? serviceContextFromDefaults({});

    const questionGen = init.questionGen ?? new LLMQuestionGenerator();
    const responseSynthesizer =
      init.responseSynthesizer ??
      new ResponseSynthesizer({
        responseBuilder: new CompactAndRefine(serviceContext),
        serviceContext,
      });

    return new SubQuestionQueryEngine({
      questionGen,
      responseSynthesizer,
      queryEngineTools: init.queryEngineTools,
    });
  }

  async aquery(query: string): Promise<Response> {
    const subQuestions = await this.questionGen.agenerate(
      this.metadatas,
      query
    );

    // groups final retrieval+synthesis operation
    const parentEvent: Event = {
      id: uuidv4(),
      type: "wrapper",
      tags: ["final"],
    };

    // groups all sub-queries
    const subQueryParentEvent: Event = {
      id: uuidv4(),
      parentId: parentEvent.id,
      type: "wrapper",
      tags: ["intermediate"],
    };

    const subQNodes = await Promise.all(
      subQuestions.map((subQ) => this.aquerySubQ(subQ, subQueryParentEvent))
    );

    const nodes = subQNodes
      .filter((node) => node !== null)
      .map((node) => node as NodeWithScore);
    return this.responseSynthesizer.asynthesize(query, nodes, parentEvent);
  }

  private async aquerySubQ(
    subQ: SubQuestion,
    parentEvent?: Event
  ): Promise<NodeWithScore | null> {
    try {
      const question = subQ.subQuestion;
      const queryEngine = this.queryEngines[subQ.toolName];

      const response = await queryEngine.aquery(question, parentEvent);
      const responseText = response.response;
      const nodeText = `Sub question: ${question}\nResponse: ${responseText}}`;
      const node = new TextNode({ text: nodeText });
      return { node, score: 0 };
    } catch (error) {
      return null;
    }
  }
}
