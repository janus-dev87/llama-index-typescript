import { OpenAI } from "./LLM";
import { SimplePrompt } from "./Prompt";
import { CallbackManager, Event } from "./callbacks/CallbackManager";

// TODO change this to LLM class
export interface BaseLLMPredictor {
  getLlmMetadata(): Promise<any>;
  apredict(
    prompt: string | SimplePrompt,
    input?: Record<string, string>,
    parentEvent?: Event
  ): Promise<string>;
}

// TODO change this to LLM class
export class ChatGPTLLMPredictor implements BaseLLMPredictor {
  model: string;
  retryOnThrottling: boolean;
  languageModel: OpenAI;
  callbackManager?: CallbackManager;

  constructor(
    props:
      | {
          model?: string;
          retryOnThrottling?: boolean;
          callbackManager?: CallbackManager;
          languageModel?: OpenAI;
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
      new OpenAI({
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
    parentEvent?: Event
  ): Promise<string> {
    if (typeof prompt === "string") {
      const result = await this.languageModel.acomplete([
        {
          content: prompt,
          role: "user",
        },
        parentEvent,
      ]);
      return result.generations[0][0].text;
    } else {
      return this.apredict(prompt(input ?? {}));
    }
  }
}
