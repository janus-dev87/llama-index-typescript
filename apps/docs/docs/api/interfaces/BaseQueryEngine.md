---
id: "BaseQueryEngine"
title: "Interface: BaseQueryEngine"
sidebar_label: "BaseQueryEngine"
sidebar_position: 0
custom_edit_url: null
---

A query engine is a question answerer that can use one or more steps.

## Implemented by

- [`RetrieverQueryEngine`](../classes/RetrieverQueryEngine.md)
- [`SubQuestionQueryEngine`](../classes/SubQuestionQueryEngine.md)

## Methods

### aquery

▸ **aquery**(`query`, `parentEvent?`): `Promise`<[`Response`](../classes/Response.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `parentEvent?` | [`Event`](Event.md) |

#### Returns

`Promise`<[`Response`](../classes/Response.md)\>

#### Defined in

[QueryEngine.ts:19](https://github.com/run-llama/LlamaIndexTS/blob/1a39403/packages/core/src/QueryEngine.ts#L19)
