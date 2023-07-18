---
sidebar_position: 3
---

# High-Level Concepts

LlamaIndex.TS helps you build LLM-powered applications (e.g. Q&A, chatbot) over custom data.

In this high-level concepts guide, you will learn:

* the retrieval augmented generation (RAG) paradigm for combining LLM with custom data,
* key concepts and modules in LlamaIndex.TS for composing your own RAG pipeline.

## Retrieval Augmented Generation (RAG)

Retrieval augmented generation (RAG) is a paradigm for augmenting LLM with custom data.
It generally consists of two stages: 

1) **indexing stage**: preparing a knowledge base, and
2) **querying stage**: retrieving relevant context from the knowledge to assist the LLM in responding to a question

![](./_static/concepts/rag.jpg)

LlamaIndex.TS provides the essential toolkit for making both steps super easy.
Let's explore each stage in detail.

### Indexing Stage
LlamaIndex.TS help you prepare the knowledge base with a suite of data connectors and indexes.

![](./_static/concepts/indexing.jpg) 

[**Data Connectors**](/apps/docs/docs/api/modules.md#):
A data connector (i.e. `Reader`) ingest data from different data sources and data formats into a simple `Document` representation (text and simple metadata).

[**Documents / Nodes**](/core_modules/data_modules/documents_and_nodes/root.md): A `Document` is a generic container around any data source - for instance, a PDF, an API output, or retrieved data from a database. A `Node` is the atomic unit of data in LlamaIndex and represents a "chunk" of a source `Document`. It's a rich representation that includes metadata and relationships (to other nodes) to enable accurate and expressive retrieval operations.

[**Data Indexes**](/core_modules/data_modules/index/root.md): 
Once you've ingested your data, LlamaIndex help you index data into a format that's easy to retrieve.
Under the hood, LlamaIndex parse the raw documents into intermediate representations, calculate vector embeddings, and infer metadata, etc.
The most commonly used index is the [VectorStoreIndex](/core_modules/data_modules/index/vector_store_guide.ipynb)

### Querying Stage
In the querying stage, the RAG pipeline retrieves the most relevant context given a user query,
and pass that to the LLM (along with the query) to synthesize a response.
This gives the LLM up-to-date knowledge that is not in its original training data,
(also reducing hallucination).
The key challenge in the querying stage is retrieval, orchestration, and reasoning over (potentially many) knowledge bases.

LlamaIndex provides composable modules that help you build and integrate RAG pipelines for Q&A (query engine), chatbot (chat engine), or as part of an agent.herry
These building blocks can be customized to reflect ranking preferences, as well as composed to reason over multiple knowledge bases in a structured way.

![](./_static/concepts/querying.jpg)

#### Building Blocks
[**Retrievers**](/core_modules/query_modules/retriever/root.md): 
A retriever defines how to efficiently retrieve relevant context from a knowledge base (i.e. index) when given a query.
The specific retrieval logic differs for difference indices, the most popular being dense retrieval against a vector index.

[**Node Postprocessors**](/core_modules/query_modules/node_postprocessors/root.md):
A node postprocessor takes in a set of nodes, then apply transformation, filtering, or re-ranking logic to them. 

[**Response Synthesizers**](/core_modules/query_modules/response_synthesizers/root.md):
A response synthesizer generates a response from an LLM, using a user query and a given set of retrieved text chunks.  

#### Pipelines

[**Query Engines**](/core_modules/query_modules/query_engine/root.md):
A query engine is an end-to-end pipeline that allow you to ask question over your data.
It takes in a natural language query, and returns a response, along with reference context retrieved and passed to the LLM.


[**Chat Engines**](/core_modules/query_modules/chat_engines/root.md): 
A chat engine is an end-to-end pipeline for having a conversation with your data
(multiple back-and-forth instead of a single question & answer).

# Concepts

LlamaIndex.TS is a typescript package that allows you to quickly load data and query/chat with your own data. The diagram below 

LlamaIndex.TS offers various key abstractions, which can be categorized as a **High Level API**, as well as a **Low Level API** for more granular customization.


