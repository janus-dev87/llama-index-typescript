---
sidebar_position: 1
---

# Embedding

The embedding model in LlamaIndex is responsible for creating numerical representations of text. By default, LlamaIndex will use the `text-embedding-ada-002` model from OpenAI. 

This can be explicitly set in the `ServiceContext` object.

```typescript
import { OpenAIEmbedding, ServiceContext } from "llamaindex";

const openaiEmbeds = new OpenAIEmbedding();

const serviceContext = new ServiceContext({ embedModel: openaiEmbeds });
```