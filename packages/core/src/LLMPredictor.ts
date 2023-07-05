import { ChatOpenAI } from "./LanguageModel";
import { SimplePrompt } from "./Prompt";
import { CallbackManager, Trace } from "./callbacks/CallbackManager";

export interface BaseLLMPredictor {
  getLlmMetadata(): Promise<any>;
  apredict(
    prompt: string | SimplePrompt,
    input?: Record<string, string>,
    parentTrace?: Trace
  ): Promise<string>;
}

export class ChatGPTLLMPredictor implements BaseLLMPredictor {
  model: string;
  retryOnThrottling: boolean;
  languageModel: ChatOpenAI;
  callbackManager?: CallbackManager;

  constructor(
    props:
      | {
          model?: string;
          retryOnThrottling?: boolean;
          callbackManager?: CallbackManager;
          languageModel?: ChatOpenAI;
        }
      | undefined = undefined
  ) {
    const {
      model = "gpt-3.5-turbo",
      retryOnThrottling = true,
      callbackManager,
      languageModel,
    } = props || {};
    this.model = model;
    this.callbackManager = callbackManager;
    this.retryOnThrottling = retryOnThrottling;

    this.languageModel =
      languageModel ??
      new ChatOpenAI({
        model: this.model,
        callbackManager: this.callbackManager,
      });
  }

  async getLlmMetadata() {
    throw new Error("Not implemented yet");
  }

  async apredict(
    prompt: string | SimplePrompt,
    input?: Record<string, string>,
    parentTrace?: Trace
  ): Promise<string> {
    if (typeof prompt === "string") {
      const result = await this.languageModel.agenerate(
        [
          {
            content: prompt,
            type: "human",
          },
        ],
        parentTrace
      );
      return result.generations[0][0].text;
    } else {
      return this.apredict(prompt(input ?? {}));
    }
  }
}
