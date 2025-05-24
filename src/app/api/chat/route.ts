import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { NextResponse } from "next/server";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Debug: check if token is present
    console.log("GITHUB_TOKEN present:", !!token);
    // Debug: log the model being used
    console.log("Using model:", model);

    console.log("Token is:", token?.slice(0, 6) + "..." + token?.slice(-4));

    const client = ModelClient(endpoint, new AzureKeyCredential(token || ""));
    console.log("client:- ", client);

    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        temperature: 1,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      // Debug: log full response body for inspection
      console.error("Unexpected response body:", response.body);
      throw new Error(
        response.body?.error?.message ||
          JSON.stringify(response.body) ||
          "Unknown error"
      );
    }

    return NextResponse.json(response.body.choices[0].message);
  } catch (error) {
    console.error("🔥 AI Inference error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
