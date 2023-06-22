import { Document } from "./Document";
import { Node, NodeWithEmbedding } from "./Node";
import { SimpleNodeParser } from "./NodeParser";
import { BaseQueryEngine, RetrieverQueryEngine } from "./QueryEngine";
import { v4 as uuidv4 } from "uuid";
import { VectorIndexRetriever } from "./Retriever";
import { BaseEmbedding, OpenAIEmbedding } from "./Embedding";
export class BaseIndex {
  nodes: Node[] = [];

  constructor(nodes?: Node[]) {
    this.nodes = nodes ?? [];
  }
}

export class IndexDict {
  indexId: string;
  summary?: string;
  nodesDict: Record<string, Node> = {};
  docStore: Record<string, Document> = {}; // FIXME: this should be implemented in storageContext

  constructor(indexId = uuidv4(), summary = undefined) {
    this.indexId = indexId;
    this.summary = summary;
  }

  getSummary(): string {
    if (this.summary === undefined) {
      throw new Error("summary field of the index dict is not set");
    }
    return this.summary;
  }

  addNode(node: Node, textId?: string) {
    const vectorId = textId ?? node.getDocId();
    this.nodesDict[vectorId] = node;
  }
}

export class VectorStoreIndex extends BaseIndex {
  indexStruct: IndexDict;
  nodesWithEmbeddings: NodeWithEmbedding[] = []; // FIXME replace with storage context
  embeddingService: BaseEmbedding; // FIXME replace with service context

  constructor(nodes: Node[]) {
    super(nodes);
    this.indexStruct = new IndexDict();

    if (nodes !== undefined) {
      this.buildIndexFromNodes();
    }

    this.embeddingService = new OpenAIEmbedding();
  }

  async getNodeEmbeddingResults(logProgress = false) {
    for (let i = 0; i < this.nodes.length; ++i) {
      const node = this.nodes[i];
      if (logProgress) {
        console.log(`getting embedding for node ${i}/${this.nodes.length}`);
      }
      const embedding = await this.embeddingService.aGetTextEmbedding(
        node.getText()
      );
      this.nodesWithEmbeddings.push({ node: node, embedding: embedding });
    }
  }

  buildIndexFromNodes() {
    for (const node of this.nodes) {
      this.indexStruct.addNode(node);
    }
  }

  static async fromDocuments(documents: Document[]): Promise<VectorStoreIndex> {
    const nodeParser = new SimpleNodeParser(); // FIXME use service context
    const nodes = nodeParser.getNodesFromDocuments(documents);
    const index = new VectorStoreIndex(nodes);
    await index.getNodeEmbeddingResults();
    return index;
  }

  asRetriever(): VectorIndexRetriever {
    return new VectorIndexRetriever(this, this.embeddingService);
  }

  asQueryEngine(): BaseQueryEngine {
    return new RetrieverQueryEngine(this.asRetriever());
  }
}
