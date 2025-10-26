import React from "react";
import { MessageCircle } from "lucide-react";

export interface LiveChatMessage {
  user: string;
  message: string;
  timestamp?: string;
}

export interface LiveChatProps {
  messages?: LiveChatMessage[];
  placeholder?: string;
}

const FALLBACK_MESSAGES: LiveChatMessage[] = [
  { user: "Lina", message: "Haha, den bossen var vilt!" },
  { user: "Jonas", message: "Gleder meg til premie-trekningen 🔥" },
  { user: "Sara", message: "Hei fra TikTok 😎" },
  { user: "Marius", message: "Bra lyd i dag!" },
];

export function LiveChat({ messages = FALLBACK_MESSAGES, placeholder }: LiveChatProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-2 flex items-center gap-2 text-cyan-300 font-semibold">
        <MessageCircle className="h-4 w-4" /> Live chat
      </h3>
      <div className="flex-1 space-y-2 overflow-y-auto text-sm text-zinc-300">
        {messages.map((chat) => (
          <div key={`${chat.user}-${chat.message}`} className="rounded-lg bg-white/5 px-3 py-2">
            <span className="font-semibold text-cyan-300">{chat.user}</span>: {chat.message}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder={placeholder ?? "Skriv en kommentar..."}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
          disabled
        />
      </div>
    </div>
  );
}

export default LiveChat;
