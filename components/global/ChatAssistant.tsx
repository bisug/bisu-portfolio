import { useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";
type Msg = { id: number; role: Role; content: string };
let nextId = 1;

const SUGGESTIONS = ["What has Bisu built?", "What is Bisu skilled in?", "How do I contact Bisu?"];

// Offline/local fallback so the widget still answers when /api/chat is
// unreachable (AI binding missing, adblocker, offline). Keyword-matched.
function localReply(q: string): string {
  const s = q.toLowerCase();
  if (/contact|email|hire|reach|hello|hi\b/.test(s))
    return "You can reach Bisu at bisu.ghlan@gmail.com — he's also on GitHub (github.com/bisug) and LinkedIn (linkedin.com/in/bisug).";
  if (/skill|stack|tech|language|know|good at/.test(s))
    return "Bisu's main stack is Python, TypeScript, Rust, and Go — plus React/NextJS, FastAPI, NodeJS, and Bun. For data and ops he uses MongoDB, PostgreSQL, Redis, Docker, Git, and Linux.";
  if (/project|built|build|work|portfolio|bot|cli/.test(s))
    return "A few favorites:\nBinaryInspector — safe Rust CLI for inspecting ELF binaries\nPaila — travel and community platform for Nepal\nTG-GithubBot — GitHub events delivered to Telegram\nninfo — whole-system Linux snapshot as JSON\nThere's more on the Projects page — want details on any of these?";
  if (/who|about|bisu|study|school|education/.test(s))
    return "Bisu Ghalan is a computer science student (Cyber Security and Network Technology) from Bhaktapur, Nepal. He builds Telegram bots, CLI tools, and full-stack apps — and loves breaking things to learn how to defend them.";
  if (/experience|hackathon|job|work/.test(s))
    return "Bisu's competed at JunctionX Kathmandu and the Build Nepal Hackathon, among others. The Experience page has the full rundown.";
  return "I mostly cover Bisu's projects, skills, and contact info — what would you like to know about those?";
}

// Mirror of the server sanitize(): plain-text chat bubbles, no markdown.
function clean(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/[*_`#>|]/g, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, 900);
}

// Render plain-text replies with paragraph/line breaks preserved (no
// array-index keys: one <p> with pre-wrap keeps whitespace natively).
function Reply({ text }: { text: string }) {
  return <span className="whitespace-pre-wrap">{text}</span>;
}

/* Reads a Workers AI SSE stream (data: {...} lines with .response tokens). */
async function readStream(res: Response, onToken: (t: string) => void): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) throw new Error("no stream");
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";
  let lastFlush = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      const data = line.replace(/^data:\s*/, "").trim();
      if (!data || data === "[DONE]") continue;
      try {
        const token = (JSON.parse(data) as { response?: string }).response ?? "";
        full += token;
      } catch {
        /* partial JSON chunk — wait for more */
      }
    }
    // Throttle re-renders: flush at most every 90ms so long streams don't
    // re-render the bubble per token.
    const now = Date.now();
    if (full && now - lastFlush > 90) {
      lastFlush = now;
      onToken(full);
    }
  }
  if (full) onToken(full);
  return full;
}
function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hey! Ask me about Bisu's projects, skills, or contact info.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCount = msgs.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on any new message/open/loading tick.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgCount, open, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...msgs, { id: nextId++, role: "user", content: q }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      let full = "";
      const replyId = nextId++;
      setMsgs([...next, { id: replyId, role: "assistant", content: "" }]);
      full = await readStream(res, (snap) => {
        const cleaned = clean(snap);
        setMsgs((prev) => prev.map((m) => (m.id === replyId ? { ...m, content: cleaned } : m)));
      });
      if (!full.trim()) throw new Error("empty stream");
      const cleaned = clean(full);
      setMsgs((prev) => prev.map((m) => (m.id === replyId ? { ...m, content: cleaned } : m)));
    } catch {
      setMsgs([...next, { id: nextId++, role: "assistant", content: localReply(q) }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Bisu's AI assistant"
          className="flex h-[min(480px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-fun-navy-darkest shadow-2xl shadow-black/60"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-fun-accent" aria-hidden="true" />
            <p className="text-sm font-bold">Ask about Bisu</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto rounded-lg px-2 py-1 text-fun-gray hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm" aria-live="polite">
            {msgs.map((m) => (
              <p
                key={m.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-fun-accent text-fun-navy-darkest font-medium"
                    : "bg-white/5 text-fun-gray-light"
                }`}
              >
                {m.role === "assistant" ? <Reply text={m.content || "…"} /> : m.content || "…"}
              </p>
            ))}
            {loading && msgs[msgs.length - 1]?.role === "user" && (
              <p className="max-w-[85%] rounded-xl bg-white/5 px-3 py-2 text-fun-gray">…</p>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={loading}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-fun-gray-light hover:border-fun-accent hover:text-white transition disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-white/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message the assistant
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 1000))}
              placeholder="Ask about projects, skills…"
              autoComplete="off"
              maxLength={1000}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-fun-gray focus:border-fun-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-fun-accent px-4 py-2 text-sm font-bold text-fun-navy-darkest hover:brightness-110 transition disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-fun-accent text-fun-navy-darkest shadow-lg shadow-fun-accent/25 hover:brightness-110 hover:-translate-y-0.5 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 6h16v9H9l-5 4V6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

export default ChatAssistant;
