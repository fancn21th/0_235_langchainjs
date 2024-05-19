import "dotenv/config";
import { HttpsProxyAgent } from "https-proxy-agent";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Configure your corporate proxy settings
const proxyUrl = process.env.PROXY_URL; // PROXY_URL=http://127.0.0.1:1234 defined in .env file
const proxyAgent = new HttpsProxyAgent(proxyUrl);

const model = new ChatOpenAI({
  configuration: {
    httpAgent: proxyAgent, // Use httpAgent or httpsAgent based on your proxy protocol
  },
});
const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);
const outputParser = new StringOutputParser();

const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

// const result = await chain.invoke({ topic: "bears" });

// console.log(result);

const stream = await chain.stream({ topic: "bears" });

const chunks = [];

for await (const chunk of stream) {
  console.log(chunk);
  chunks.push(chunk);
}

console.log(chunks.join(""));
