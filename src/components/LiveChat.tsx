import { MessageCircle } from "lucide-react";

const dummyMessages = [
  { user: "Lina", msg: "Haha, den bossen var vilt!" },
  { user: "Jonas", msg: "Gleder meg til premie-trekningen 🔥" },
];

export default function LiveChat() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col">
      <h3 className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
        <MessageCircle className="h-4 w-4" /> Live chat
      </h3>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm text-zinc-300">
        {dummyMessages.map((chat, index) => (
          <div key={`${chat.user}-${index}`} className="bg-white/5 rounded-lg px-3 py-2">
            <span className="text-cyan-300 font-semibold">{chat.user}</span>: {chat.msg}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Skriv en kommentar..."
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
        />
      </div>
    </div>
  );
}
