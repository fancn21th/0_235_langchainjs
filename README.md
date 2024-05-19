# Langchain in JS

## How to run

```bash
npm i --verbose     # Install dependencies
npm start           # Run the main program
```

## Behind the corporate proxy

if you are behind a corporate proxy, you can set the proxy in the `.env` file in the root of the project.

it is based on the interface ChatOpenAI Configuration, as of 2024-05-19. it may change from time to time.

```ts
const model = new ChatOpenAI({
  configuration: {
    httpAgent: proxyAgent, // Use httpAgent or httpsAgent based on your proxy protocol
  },
});
```
