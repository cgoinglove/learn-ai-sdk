import { PromptTemplate } from "@langchain/core/prompts";
import { describe, test } from "vitest";

describe("template", () => {
  test("default", async () => {
    const promptTemplate = PromptTemplate.fromTemplate(
      "Tell me a joke about {topic}",
    );

    const value = await promptTemplate.invoke({ topic: "cats" });

    console.log(value);
  });
});
