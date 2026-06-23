// ==============================================================
// TYPES — Definisi tipe data sentral untuk seluruh aplikasi
// ==============================================================

// ------ Chat & Message ------

export type MessageRole = "user" | "assistant" | "tool";

export type MessageStatus = "streaming" | "complete" | "error";

/** Satu pesan dalam percakapan */
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  toolCall?: ToolCallMetadata;
  usage?: TokenUsage;
}

export interface ToolCallMetadata {
  toolName: string;
  toolArgs: Record<string, unknown>;
  toolResult?: unknown;
  executionTimeMs?: number;
}

export interface TokenUsage {
  promptTokens: number;
  candidateTokens: number;
  totalTokens: number;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  messages: Message[];
  composioEntityId?: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  history: GeminiHistoryEntry[];
  enableTools?: boolean;
}

export interface GeminiHistoryEntry {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export type StreamChunk =
  | { type: "text"; delta: string }
  | { type: "tool_start"; toolName: string; args: Record<string, unknown> }
  | { type: "tool_result"; toolName: string; result: unknown; executionTimeMs: number }
  | { type: "usage"; usage: TokenUsage }
  | { type: "error"; message: string }
  | { type: "done" };

export interface GeminiToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface ComposioActionResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface AppState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isToolsEnabled: boolean;
}
