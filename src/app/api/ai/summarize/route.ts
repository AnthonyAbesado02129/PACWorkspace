import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript } = body;

    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Summarize the conversation transcript into exactly 3 bullet points (case notes style). Be concise and factual. Focus on: issue raised, actions taken or agreed, and next steps or outcome.",
            },
            { role: "user", content: transcript },
          ],
          max_tokens: 400,
        }),
      });
      const data = await response.json();
      const summary =
        data.choices?.[0]?.message?.content ?? "Unable to generate summary.";
      return NextResponse.json({ summary });
    }

    const mockSummary = `• Customer contacted regarding an account or support matter; key details were discussed.
• Agent provided guidance and next steps in line with policy.
• Follow-up or resolution path was agreed; customer acknowledged.`;
    return NextResponse.json({ summary: mockSummary });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to summarize" },
      { status: 500 }
    );
  }
}
