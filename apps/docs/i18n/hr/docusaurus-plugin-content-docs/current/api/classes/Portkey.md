---
id: "Portkey"
title: "Class: Portkey"
sidebar_label: "Portkey"
sidebar_position: 0
custom_edit_url: null
---

Unified language model interface

## Implements

- [`LLM`](../interfaces/LLM.md)

## Constructors

### constructor

• **new Portkey**(`init?`)

#### Parameters

| Name    | Type                                |
| :------ | :---------------------------------- |
| `init?` | `Partial`<[`Portkey`](Portkey.md)\> |

#### Defined in

[packages/core/src/llm/LLM.ts:814](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L814)

## Properties

### apiKey

• `Optional` **apiKey**: `string` = `undefined`

#### Defined in

[packages/core/src/llm/LLM.ts:807](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L807)

---

### baseURL

• `Optional` **baseURL**: `string` = `undefined`

#### Defined in

[packages/core/src/llm/LLM.ts:808](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L808)

---

### callbackManager

• `Optional` **callbackManager**: [`CallbackManager`](CallbackManager.md)

#### Defined in

[packages/core/src/llm/LLM.ts:812](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L812)

---

### hasStreaming

• **hasStreaming**: `boolean` = `true`

#### Implementation of

[LLM](../interfaces/LLM.md).[hasStreaming](../interfaces/LLM.md#hasstreaming)

#### Defined in

[packages/core/src/llm/LLM.ts:805](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L805)

---

### llms

• `Optional` **llms**: `null` \| [`LLMOptions`] = `undefined`

#### Defined in

[packages/core/src/llm/LLM.ts:810](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L810)

---

### mode

• `Optional` **mode**: `string` = `undefined`

#### Defined in

[packages/core/src/llm/LLM.ts:809](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L809)

---

### session

• **session**: `PortkeySession`

#### Defined in

[packages/core/src/llm/LLM.ts:811](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L811)

## Accessors

### metadata

• `get` **metadata**(): [`LLMMetadata`](../interfaces/LLMMetadata.md)

#### Returns

[`LLMMetadata`](../interfaces/LLMMetadata.md)

#### Implementation of

[LLM](../interfaces/LLM.md).[metadata](../interfaces/LLM.md#metadata)

#### Defined in

[packages/core/src/llm/LLM.ts:832](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L832)

## Methods

### chat

▸ **chat**<`T`, `R`\>(`messages`, `parentEvent?`, `streaming?`, `params?`): `Promise`<`R`\>

Get a chat response from the LLM

#### Type parameters

| Name | Type                                                                                                                  |
| :--- | :-------------------------------------------------------------------------------------------------------------------- |
| `T`  | extends `undefined` \| `boolean` = `undefined`                                                                        |
| `R`  | `T` extends `true` ? `AsyncGenerator`<`string`, `void`, `unknown`\> : [`ChatResponse`](../interfaces/ChatResponse.md) |

#### Parameters

| Name           | Type                                            | Description                                                                                      |
| :------------- | :---------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `messages`     | [`ChatMessage`](../interfaces/ChatMessage.md)[] | The return type of chat() and complete() are set by the "streaming" parameter being set to True. |
| `parentEvent?` | [`Event`](../interfaces/Event.md)               | -                                                                                                |
| `streaming?`   | `T`                                             | -                                                                                                |
| `params?`      | `Record`<`string`, `any`\>                      | -                                                                                                |

#### Returns

`Promise`<`R`\>

#### Implementation of

[LLM](../interfaces/LLM.md).[chat](../interfaces/LLM.md#chat)

#### Defined in

[packages/core/src/llm/LLM.ts:836](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L836)

---

### complete

▸ **complete**<`T`, `R`\>(`prompt`, `parentEvent?`, `streaming?`): `Promise`<`R`\>

Get a prompt completion from the LLM

#### Type parameters

| Name | Type                                                                                                                  |
| :--- | :-------------------------------------------------------------------------------------------------------------------- |
| `T`  | extends `undefined` \| `boolean` = `undefined`                                                                        |
| `R`  | `T` extends `true` ? `AsyncGenerator`<`string`, `void`, `unknown`\> : [`ChatResponse`](../interfaces/ChatResponse.md) |

#### Parameters

| Name           | Type                              | Description            |
| :------------- | :-------------------------------- | :--------------------- |
| `prompt`       | `string`                          | the prompt to complete |
| `parentEvent?` | [`Event`](../interfaces/Event.md) | -                      |
| `streaming?`   | `T`                               | -                      |

#### Returns

`Promise`<`R`\>

#### Implementation of

[LLM](../interfaces/LLM.md).[complete](../interfaces/LLM.md#complete)

#### Defined in

[packages/core/src/llm/LLM.ts:860](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L860)

---

### streamChat

▸ **streamChat**(`messages`, `parentEvent?`, `params?`): `AsyncGenerator`<`string`, `void`, `unknown`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `messages`     | [`ChatMessage`](../interfaces/ChatMessage.md)[] |
| `parentEvent?` | [`Event`](../interfaces/Event.md)               |
| `params?`      | `Record`<`string`, `any`\>                      |

#### Returns

`AsyncGenerator`<`string`, `void`, `unknown`\>

#### Defined in

[packages/core/src/llm/LLM.ts:875](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L875)

---

### streamComplete

▸ **streamComplete**(`query`, `parentEvent?`): `AsyncGenerator`<`string`, `void`, `unknown`\>

#### Parameters

| Name           | Type                              |
| :------------- | :-------------------------------- |
| `query`        | `string`                          |
| `parentEvent?` | [`Event`](../interfaces/Event.md) |

#### Returns

`AsyncGenerator`<`string`, `void`, `unknown`\>

#### Defined in

[packages/core/src/llm/LLM.ts:922](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L922)

---

### tokens

▸ **tokens**(`messages`): `number`

Calculates the number of tokens needed for the given chat messages

#### Parameters

| Name       | Type                                            |
| :--------- | :---------------------------------------------- |
| `messages` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |

#### Returns

`number`

#### Implementation of

[LLM](../interfaces/LLM.md).[tokens](../interfaces/LLM.md#tokens)

#### Defined in

[packages/core/src/llm/LLM.ts:828](https://github.com/run-llama/LlamaIndexTS/blob/f0be933/packages/core/src/llm/LLM.ts#L828)
