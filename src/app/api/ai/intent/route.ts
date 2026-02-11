import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

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
                "Analyze the customer message and identify the primary intent. Return a short structured analysis: Primary Intent, Confidence (high/medium/low), Category (e.g. Billing, Support, Retention), and Key Entities or Actions mentioned. Be concise.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 300,
        }),
      });
      const data = await response.json();
      const analysis =
        data.choices?.[0]?.message?.content ?? "Unable to analyze intent.";
      return NextResponse.json({ analysis });
    }

    const mockAnalysis = `**Primary Intent:** General inquiry / support request
**Confidence:** Medium
**Category:** Support
**Key points:** Customer is seeking clarification or assistance. Consider routing to customer care for personalized response.`;
    return NextResponse.json({ analysis: mockAnalysis });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to analyze intent" },
      { status: 500 }
    );
  }
}
