---
id: "CondenseQuestionChatEngine"
title: "Class: CondenseQuestionChatEngine"
sidebar_label: "CondenseQuestionChatEngine"
sidebar_position: 0
custom_edit_url: null
---

CondenseQuestionChatEngine is used in conjunction with a Index (for example VectorIndex).
It does two steps on taking a user's chat message: first, it condenses the chat message
with the previous chat history into a question with more context.
Then, it queries the underlying Index using the new question with context and returns
the response.
CondenseQuestionChatEngine performs well when the input is primarily questions about the
underlying data. It performs less well when the chat messages are not questions about the
data, or are very referential to previous context.

## Implements

- `ChatEngine`

## Constructors

### constructor

• **new CondenseQuestionChatEngine**(`init`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `Object` |
| `init.chatHistory` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |
| `init.condenseMessagePrompt?` | [`SimplePrompt`](../modules.md#simpleprompt) |
| `init.queryEngine` | [`BaseQueryEngine`](../interfaces/BaseQueryEngine.md) |
| `init.serviceContext?` | [`ServiceContext`](../interfaces/ServiceContext.md) |

#### Defined in

[ChatEngine.ts:75](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L75)

## Properties

### chatHistory

• **chatHistory**: [`ChatMessage`](../interfaces/ChatMessage.md)[]

#### Defined in

[ChatEngine.ts:71](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L71)

___

### condenseMessagePrompt

• **condenseMessagePrompt**: [`SimplePrompt`](../modules.md#simpleprompt)

#### Defined in

[ChatEngine.ts:73](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L73)

___

### queryEngine

• **queryEngine**: [`BaseQueryEngine`](../interfaces/BaseQueryEngine.md)

#### Defined in

[ChatEngine.ts:70](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L70)

___

### serviceContext

• **serviceContext**: [`ServiceContext`](../interfaces/ServiceContext.md)

#### Defined in

[ChatEngine.ts:72](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L72)

## Methods

### achat

▸ **achat**(`message`, `chatHistory?`): `Promise`<[`Response`](Response.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `chatHistory?` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |

#### Returns

`Promise`<[`Response`](Response.md)\>

#### Implementation of

ChatEngine.achat

#### Defined in

[ChatEngine.ts:104](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L104)

___

### acondenseQuestion

▸ `Private` **acondenseQuestion**(`chatHistory`, `question`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatHistory` | [`ChatMessage`](../interfaces/ChatMessage.md)[] |
| `question` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[ChatEngine.ts:89](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L89)

___

### reset

▸ **reset**(): `void`

#### Returns

`void`

#### Implementation of

ChatEngine.reset

#### Defined in

[ChatEngine.ts:123](https://github.com/run-llama/llamascript/blob/4649536/packages/core/src/ChatEngine.ts#L123)
