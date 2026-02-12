const MODULES = ["compose", "entities", "intent", "summarize", "translate"] as const;
export type MasterPromptModule = (typeof MODULES)[number];

export const DEFAULT_MASTER_PROMPT_TEMPLATE =
  "You are a {{persona}} in the {{vertical}} industry. Use the following rules: {{rules}}. Context: {{transcript}}";

const store: Partial<Record<MasterPromptModule, { prompt: string; version: string }>> = {};

export function getMasterPrompt(module: MasterPromptModule): string {
  const entry = store[module];
  return entry?.prompt ?? DEFAULT_MASTER_PROMPT_TEMPLATE;
}

export function setMasterPrompt(
  module: MasterPromptModule,
  prompt: string,
  version = "v1.0.0"
): void {
  store[module] = { prompt, version };
}

export function getMasterPromptModules(): readonly MasterPromptModule[] {
  return MODULES;
}

export function isMasterPromptModule(id: string): id is MasterPromptModule {
  return MODULES.includes(id as MasterPromptModule);
}
