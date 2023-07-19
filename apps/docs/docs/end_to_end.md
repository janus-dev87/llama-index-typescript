---
sidebar_position: 3
---

# End to End Examples

We include several end-to-end examples using LlamaIndex.TS in the repository

## [Chat Engine](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/chatEngine.ts)

Read a file and chat about it with the LLM.

## [List Index](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/listIndex.ts)

Create a list index and query it. This example also use the `LLMRetriever`, which will use the LLM to select the best nodes to use when generating answer.

## [Vector Index](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/vectorIndex.ts)

Create a vector index and query it. The vector index will use embeddings to fetch the top k most relevant nodes. By default, the top k is 2.

## [OpenAI LLM](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/openai.ts)

Create an OpenAI LLM and directly use it for chat. 

## [SubQuestionQueryEngine](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/subquestion.ts)

Uses the `SubQuestionQueryEngine`, which breaks complex queries into multiple questions, and then aggreates a response across the answers to all sub-questions.

## [Low Level Modules](https://github.com/run-llama/LlamaIndexTS/blob/main/apps/simple/lowlevel.ts)

This example uses several low-level components, which removes the need for an actual query engine. These components can be used anywhere, in any application, or customized and sub-classed to meet your own needs.