import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Menu,
  MessageCircle,
  Play,
  Smartphone,
  Twitch,
  X,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlatformButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function PlatformButton({ icon, label, href }: PlatformButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/10 transition"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.a>
  );
}

export default function FjolsenbandenLive() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!unmuted && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [countdown, unmuted]);

  useEffect(() => {
    if (unmuted) {
      setCountdown(0);
    }
  }, [unmuted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] to-[#1a1a2e] text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,207,255,0.15),transparent_70%)]"
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <header className="flex justify-between items-center px-6 py-4 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-cyan-400 text-black font-extrabold rounded-xl grid place-items-center">
            FB
          </div>
          <h1 className="font-bold text-lg">Fjolsenbanden</h1>
        </div>

        <button onClick={() => setMenuOpen((open) => !open)} className="md:hidden p-2" aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`absolute md:static top-16 right-0 md:flex bg-[#0d0d1a]/90 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none shadow-xl md:shadow-none transition-all ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 text-sm font-medium">
            {["Hjem", "Premier", "Foreldre", "Sponsorer", "Kontakt"].map((item) => (
              <li key={item} className="hover:text-cyan-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <motion.div
              className="absolute top-3 left-3 bg-rose-500 text-xs px-3 py-1 rounded-full font-semibold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              🔴 LIVE
            </motion.div>

            <iframe
              src={`https://player.twitch.tv/?channel=fjolsenbanden&parent=localhost&muted=${!unmuted}`}
              title="Twitch Player"
              allowFullScreen
              className="w-full aspect-video"
            />

            {!unmuted && (
              <div className="absolute inset-0 bg-black/70 grid place-items-center text-center p-6">
                <div>
                  <Play className="h-12 w-12 mx-auto mb-3 text-cyan-400" />
                  <p className="text-sm text-zinc-300 mb-4">
                    1-minutt forhåndsvisning – {countdown}s igjen
                  </p>
                  <Button
                    onClick={() => setUnmuted(true)}
                    className="rounded-full px-6 py-4 text-base"
                  >
                    Se full stream
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <PlatformButton
              icon={<Youtube className="h-5 w-5 text-red-500" />}
              label="Se på YouTube"
              href="https://youtube.com/@fjolsenbanden"
            />
            <PlatformButton
              icon={<Twitch className="h-5 w-5 text-purple-500" />}
              label="Se på Twitch"
              href="https://twitch.tv/fjolsenbanden"
            />
            <PlatformButton
              icon={<Smartphone className="h-5 w-5 text-pink-400" />}
              label="Se på TikTok"
              href="https://tiktok.com/@fjolsenbanden"
            />
            <PlatformButton
              icon={<Facebook className="h-5 w-5 text-blue-500" />}
              label="Se på Facebook Gaming"
              href="https://facebook.com/fjolsenbanden"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col">
          <h3 className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
            <MessageCircle className="h-4 w-4" /> Live chat
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 text-sm text-zinc-300">
            {[
              { user: "Lina", msg: "Haha, den bossen var vilt!" },
              { user: "Jonas", msg: "Gleder meg til premie-trekningen 🔥" },
              { user: "Sara", msg: "Hei fra TikTok 😎" },
              { user: "Marius", msg: "Bra lyd i dag!" },
            ].map((chat) => (
              <div key={chat.user} className="bg-white/5 rounded-lg px-3 py-2">
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
      </main>

      <footer className="text-center text-xs text-zinc-400 py-6 border-t border-white/10">
        © {new Date().getFullYear()} Fjolsenbanden – Stream. Spill. Vinn.
      </footer>
    </div>
  );
}
