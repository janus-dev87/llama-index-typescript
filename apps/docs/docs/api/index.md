---
id: "index"
title: "llamaindex"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# LlamaIndex.TS

Use your own data with large language models (LLMs, OpenAI ChatGPT and others) in Typescript and Javascript.

## What is LlamaIndex.TS?

LlamaIndex.TS aims to be a lightweight, easy to use set of libraries to help you integrate large language models into your applications with your own data.

## Getting started with an example:

LlamaIndex.TS requries Node v18 or higher. You can download it from https://nodejs.org or use https://nvm.sh (our preferred option).

In a new folder:

```bash
export OPEN_AI_KEY="sk-......" # Replace with your key from https://platform.openai.com/account/api-keys
npx tsc –-init # if needed
pnpm install llamaindex
```

Create the file example.ts

```ts
// example.ts
import fs from "fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";

async function main() {
  // Load essay from abramov.txt in Node
  const essay = await fs.readFile(
    "node_modules/llamaindex/examples/abramov.txt",
    "utf-8"
  );

  // Create Document object with essay
  const document = new Document({ text: essay });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.aquery(
    "What did the author do in college?"
  );

  // Output response
  console.log(response.toString());
}
```

Then you can run it using

```bash
npx ts-node example.ts
```

## Core concepts:

- [Document](packages/core/src/Node.ts): A document represents a text file, PDF file or other contiguous piece of data.

- [Node](packages/core/src/Node.ts): The basic data building block. Most commonly, these are parts of the document split into manageable pieces that are small enough to be fed into an embedding model and LLM.

- Indexes: indexes store the Nodes and the embeddings of those nodes.

- [QueryEngine](packages/core/src/QueryEngine.ts): Query engines are what generate the query you put in and give you back the result. Query engines generally combine a pre-built prompt with selected nodes from your Index to give the LLM the context it needs to answer your query.

- [ChatEngine](packages/core/src/ChatEngine.ts): A ChatEngine helps you build a chatbot that will interact with your Indexes.


## Contributing:

We are in the very early days of LlamaIndex.TS. If you’re interested in hacking on it with us check out our [contributing guide](CONTRIBUTING.md)

## Bugs? Questions?

Please join our Discord! https://discord.com/invite/eN6D2HQ4aX
