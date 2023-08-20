---
id: "LlamaDeuce"
title: "Class: LlamaDeuce"
sidebar_label: "LlamaDeuce"
sidebar_position: 0
custom_edit_url: null
---

Llama2 LLM implementation

## Implements

- [`LLM`](../interfaces/LLM.md)

## Constructors

### constructor

• **new LlamaDeuce**(`init?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `init?` | `Partial`<[`LlamaDeuce`](LlamaDeuce.md)\> |

#### Defined in

[llm/LLM.ts:283](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L283)

## Properties

### chatStrategy

• **chatStrategy**: [`DeuceChatStrategy`](../enums/DeuceChatStrategy.md)

#### Defined in

[llm/LLM.ts:277](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L277)

___

### maxTokens

• `Optional` **maxTokens**: `number`

#### Defined in

[llm/LLM.ts:280](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L280)

___

### model

• **model**: ``"Llama-2-70b-chat-old"`` \| ``"Llama-2-70b-chat-4bit"`` \| ``"Llama-2-13b-chat"`` \| ``"Llama-2-13b-chat-4bit"`` \| ``"Llama-2-7b-chat"`` \| ``"Llama-2-7b-chat-4bit"``

#### Defined in

[llm/LLM.ts:276](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L276)

___

### replicateSession

• **replicateSession**: `ReplicateSession`

#### Defined in

[llm/LLM.ts:281](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L281)

___

### temperature

• **temperature**: `number`

#### Defined in

[llm/LLM.ts:278](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L278)

___

### topP

• **topP**: `number`

#### Defined in

[llm/LLM.ts:279](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L279)

## Methods

### chat

▸ **chat**(`messages`, `_parentEvent?`): `Promise`<[`ChatResponse`](../interfaces/ChatResponse.md)\>

Get a chat response from the LLM

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |
| `_parentEvent?` | [`Event`](../interfaces/Event.md) |

#### Returns

`Promise`<[`ChatResponse`](../interfaces/ChatResponse.md)\>

#### Implementation of

[LLM](../interfaces/LLM.md).[chat](../interfaces/LLM.md#chat)

#### Defined in

[llm/LLM.ts:402](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L402)

___

### complete

▸ **complete**(`prompt`, `parentEvent?`): `Promise`<[`ChatResponse`](../interfaces/ChatResponse.md)\>

Get a prompt completion from the LLM

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prompt` | `string` | the prompt to complete |
| `parentEvent?` | [`Event`](../interfaces/Event.md) | - |

#### Returns

`Promise`<[`ChatResponse`](../interfaces/ChatResponse.md)\>

#### Implementation of

[LLM](../interfaces/LLM.md).[complete](../interfaces/LLM.md#complete)

#### Defined in

[llm/LLM.ts:439](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L439)

___

### mapMessageTypeA16Z

▸ **mapMessageTypeA16Z**(`messageType`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageType` | [`MessageType`](../modules.md#messagetype) |

#### Returns

`string`

#### Defined in

[llm/LLM.ts:326](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L326)

___

### mapMessagesToPrompt

▸ **mapMessagesToPrompt**(`messages`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `prompt` | `string` |
| `systemPrompt` | `undefined` \| `string` |

#### Defined in

[llm/LLM.ts:298](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L298)

___

### mapMessagesToPromptA16Z

▸ **mapMessagesToPromptA16Z**(`messages`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `prompt` | `string` |
| `systemPrompt` | `undefined` |

#### Defined in

[llm/LLM.ts:312](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L312)

___

### mapMessagesToPromptMeta

▸ **mapMessagesToPromptMeta**(`messages`, `opts?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |
| `opts?` | `Object` |
| `opts.replicate4Bit?` | `boolean` |
| `opts.withBos?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `prompt` | `string` |
| `systemPrompt` | `undefined` \| `string` |

#### Defined in

[llm/LLM.ts:339](https://github.com/run-llama/LlamaIndexTS/blob/main/packages/core/src/llm/LLM.ts#L339)
