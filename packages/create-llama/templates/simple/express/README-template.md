This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Express](https://expressjs.com/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Getting Started

First, install the dependencies:

```
npm install
```

Second, run the development server:

```
npm run dev
```

Then call the express API endpoint `/api/llm` to see the result:

```
curl --location 'localhost:3000/api/llm' \
--header 'Content-Type: application/json' \
--data '{
    "message": "Hello",
    "chatHistory": []
}'
```

You can start editing the API by modifying `src/controllers/llm.controller.ts`. The endpoint auto-updates as you save the file.

## Learn More

To learn more about LlamaIndex, take a look at the following resources:

- [LlamaIndex Documentation](https://docs.llamaindex.ai) - learn about LlamaIndex (Python features).
- [LlamaIndexTS Documentation](https://ts.llamaindex.ai) - learn about LlamaIndex (Typescript features).

You can check out [the LlamaIndexTS GitHub repository](https://github.com/run-llama/LlamaIndexTS) - your feedback and contributions are welcome!
