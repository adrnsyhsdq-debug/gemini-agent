"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Square, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatInput({ onSend, onStop, isStreaming, isToolsEnabled, disabled, placeholder = "Kirim pesan..." }: { onSend: (m: string) => void; onStop: () => void; isStreaming: boolean; isToolsEnabled: boolean; disabled?: boolean; placeholder?: string }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  useEffect(() => { adjustHeight(); }, [value, adjustHeight]);
  useEffect(() => { if (!isStreaming) textareaRef.current?.focus(); }, [isStreaming]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canSend = value.trim().length > 0 && !isStreaming && !disabled;

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="relative flex flex-col rounded-2xl border">
        <textarea ref={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} rows={1} placeholder={isStreaming ? "Sedang mengetik..." : placeholder} className="w-full bg-transparent resize-none px-4 pt-3.5 pb-1 outline-none" />
        <div className="flex items-center justify-between px-3 pb-2.5">
          <div>{isToolsEnabled && <span className="flex items-center gap-1 text-[11px]"><Wrench className="w3 h-3" />Tools aktif</span>}</div>
          <div>
            {isStreaming ? (
              <button onClick={onStop} className="w-8 h-8 rounded-xl bg-red-500/15 text-red-400"><Square className="w-3.5 h-3.5" fill="currentColor" /></button>
            ) : (
              <button onClick={handleSend} disabled={!canSend} className={cn("w-8 h-8 rounded-xl", canSend ? "bg-blue-500 text-white" : "opacity-30")}><Send className="w-3.5 h-3.5" /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
