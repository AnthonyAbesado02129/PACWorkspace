import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, mask } = body;

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
              content: `Extract sensitive data from the transcript. For each found entity list: type (Person Name, Organization, Full Address, Date/Time, Contact Info, IDs/Reference #s, Monetary Values), value, confidence (HIGH/MED/LOW). ${mask ? "Also return a masked version of the transcript with sensitive values replaced by [REDACTED] or [MASKED]." : "Return only the extraction list in a clear format."}`,
            },
            { role: "user", content: transcript },
          ],
          max_tokens: 1000,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errMsg = data.error?.message ?? data.error?.code ?? "OpenAI request failed";
        return NextResponse.json({ error: errMsg }, { status: response.status });
      }
      const result =
        data.choices?.[0]?.message?.content?.trim() ?? "Unable to extract entities.";
      return NextResponse.json({ result });
    }

    const mockResult = `Extracted fields (≥70% confidence):
• Person Name: [Sample] (HIGH)
• Contact Info: [Detected pattern] (MED)

(Add OPENAI_API_KEY for full extraction.)

Masked transcript: ${mask ? "[REDACTED] for sensitive fields." : "N/A"}`;
    return NextResponse.json({ result: mockResult });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to extract entities" },
      { status: 500 }
    );
  }
}
