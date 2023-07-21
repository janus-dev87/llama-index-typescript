import { Document, VectorStoreIndex, RetrieverQueryEngine, OpenAI, serviceContextFromDefaults } from "llamaindex";
import essay from "./essay";

// Customize retrieval and query args
async function main() {
  const document = new Document({ text: essay });

  const serviceContext = serviceContextFromDefaults(
    { llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0.0 }) }
  );

  const index = await VectorStoreIndex.fromDocuments([document], undefined, serviceContext);
  
  const retriever = index.asRetriever();
  retriever.similarityTopK = 5;
  // TODO: cannot pass responseSynthesizer into retriever query engine
  const queryEngine = new RetrieverQueryEngine(retriever);
  
  const response = await queryEngine.query(
    "What did the author do growing up?"
  );
  console.log(response.response);
}

main().catch(console.error);
