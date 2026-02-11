import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;

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
              content: `Translate the following text to ${targetLang}. Preserve tone and formatting. Return only the translation, no explanations.`,
            },
            { role: "user", content: text },
          ],
          max_tokens: 1000,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errMsg = data.error?.message ?? data.error?.code ?? "OpenAI request failed";
        return NextResponse.json({ error: errMsg }, { status: response.status });
      }
      const translation =
        data.choices?.[0]?.message?.content?.trim() ?? "Unable to translate.";
      return NextResponse.json({ translation });
    }

    const mockTranslation = `[Translation to ${targetLang}]\n${text}\n\n(Add OPENAI_API_KEY to enable real translation.)`;
    return NextResponse.json({ translation: mockTranslation });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to translate" },
      { status: 500 }
    );
  }
}
