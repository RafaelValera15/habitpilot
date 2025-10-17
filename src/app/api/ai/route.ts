import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json({
      message: "AI insights require an OPENAI_API_KEY environment variable. Add it in Vercel to enable this feature.",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are HabitPilot, an upbeat habit coach. Celebrate progress, share insight, and offer one actionable tip.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ message: message ?? "Keep the momentum going!" });
  } catch (error) {
    console.error("AI request failed", error);
    return NextResponse.json({ error: "Failed to fetch AI insights." }, { status: 500 });
  }
}
