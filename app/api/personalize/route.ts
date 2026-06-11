import { NextResponse } from "next/server";

const OPENROUTER_URL = "https://api.openrouter.ai/v1/chat/completions";

export async function POST(request: Request) {
  const data = await request.json();
  const { templateBody, prospectInfo } = data;

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "Missing OpenRouter API key." },
      { status: 500 }
    );
  }

  if (!templateBody || !prospectInfo) {
    return NextResponse.json(
      { error: "Missing template body or prospect info." },
      { status: 400 }
    );
  }

  const prompt = `Fill in the template below using the prospect information provided. Use the prospect details naturally, replace variables in double braces, and keep the output formatted as a complete outreach message.\n\nTemplate:\n${templateBody}\n\nProspect details:\n${prospectInfo}`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful copywriting assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "OpenRouter request failed." },
        { status: response.status }
      );
    }

    const content = result?.choices?.[0]?.message?.content;

    return NextResponse.json({ output: content || "" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
