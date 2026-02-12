import { NextRequest, NextResponse } from "next/server";
import {
  getMasterPrompt,
  setMasterPrompt,
  getMasterPromptModules,
  isMasterPromptModule,
  DEFAULT_MASTER_PROMPT_TEMPLATE,
  type MasterPromptModule,
} from "@/lib/master-prompt";

const MODULES = getMasterPromptModules();

export async function GET(req: NextRequest) {
  const moduleId = req.nextUrl.searchParams.get("module")?.toLowerCase();
  if (!moduleId || !isMasterPromptModule(moduleId)) {
    return NextResponse.json(
      { error: "Invalid or missing module. Use one of: " + MODULES.join(", ") },
      { status: 400 }
    );
  }
  const prompt = getMasterPrompt(moduleId);
  return NextResponse.json({
    module: moduleId,
    prompt,
    version: "v1.0.0",
    active: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { module: moduleId, prompt } = body;
    if (!moduleId || !isMasterPromptModule(moduleId.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid or missing module. Use one of: " + MODULES.join(", ") },
        { status: 400 }
      );
    }
    const key = moduleId.toLowerCase() as MasterPromptModule;
    setMasterPrompt(key, typeof prompt === "string" ? prompt : DEFAULT_MASTER_PROMPT_TEMPLATE);
    return NextResponse.json({
      module: key,
      version: "v1.0.0",
      saved: true,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save prompt" }, { status: 500 });
  }
}
