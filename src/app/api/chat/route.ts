import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

import { NextResponse } from "next/server";

// const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential("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")
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        temperature: 1,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error?.message || "Unknown error");
    }

    return NextResponse.json(response.body.choices[0].message);
  } catch (error) {
    console.error("AI Inference error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
