import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      industry,
      persona,
      tone,
      customerMood,
      salutation,
      conversationContext,
      agentKeyPoints,
      policySafe,
    } = body;

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
              content: `You are a customer care assistant. Industry: ${industry}. Persona: ${persona}. Tone: ${tone}. Customer mood: ${customerMood}. Salutation: ${salutation || "Mr./Ms."}. ${policySafe ? "Apply industry-specific compliance rules. Avoid making promises about refunds or outcomes. Be transparent and accurate." : ""}`,
            },
            {
              role: "user",
              content: `Conversation context:\n${conversationContext || "(none)"}\n\nKey points to include:\n${agentKeyPoints || "(none)"}\n\nGenerate a concise, professional draft response.`,
            },
          ],
          max_tokens: 800,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errMsg = data.error?.message ?? data.error?.code ?? "OpenAI request failed";
        return NextResponse.json({ error: errMsg }, { status: response.status });
      }
      const draft = data.choices?.[0]?.message?.content?.trim() ?? "Unable to generate draft.";
      return NextResponse.json({ draft });
    }

    // Mock response when no API key
    const mockDraft = `Dear ${salutation || "Customer"},

Thank you for reaching out. Based on our conversation and the context you've shared, here are the key points we'd like to address:

${agentKeyPoints?.trim() || "• We understand your concern and are here to help.\n• We will look into this and follow up shortly.\n• Please don't hesitate to contact us if you need further assistance."}

We appreciate your patience and will ensure this is resolved in line with our ${industry} standards.

Best regards,
Customer Care Team`;
    return NextResponse.json({ draft: mockDraft });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate draft" },
      { status: 500 }
    );
  }
}
