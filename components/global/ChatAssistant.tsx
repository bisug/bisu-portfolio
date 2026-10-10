import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";
type Msg = { id: number; role: Role; content: string };

const SUGGESTIONS = [
  "What has Bisu built?",
  "What is his tech stack?",
  "Can Bisu build my bot?",
  "Tell me a fun fact!",
];

// Offline/local fallback so the widget still answers when /api/chat is
// unreachable (AI binding missing, adblocker, offline).
function localReply(q: string): string {
  const s = q.toLowerCase();

  // 1. Greetings
  if (
    /^(hi|hello|hey|yo|sup|namaste|morning|afternoon|evening|hola|howdy)(\b|\s)/.test(s) ||
    s === "hi" ||
    s === "hello" ||
    s === "hey"
  ) {
    const greetings = [
      "Namaste and hey! Great to meet you. I'm Bisu's AI assistant. Want to check out his latest Telegram bots, explore his tech stack, or hear about his hackathon builds?",
      "Hey there! Welcome to Bisu's portfolio. I can give you the inside scoop on his projects, tell you what languages he codes in, or help you connect with him. What's on your mind?",
      "Hello! Always happy to introduce Bisu. Whether you're curious about his cyber security work, CLI tools, or his background in Nepal, fire away!",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 2. Specific project queries
  if (/paila\b/.test(s)) {
    return "Paila is one of Bisu's favorite hackathon creations! Built with team Runtime Terrors at JunctionX Kathmandu, it is a tourism and community platform connecting travelers directly with local hosts in Nepal. Take a look at the [live demo](https://paila-prototype.vercel.app) or inspect the [Paila code repository](https://github.com/bisug/Paila)!";
  }

  if (/binary|inspector|elf\b/.test(s)) {
    return "BinaryInspector is a security CLI Bisu built in Rust. It safely analyzes ELF binary headers, sections, and compiler mitigation flags without executing untrusted code. Check out the [BinaryInspector repository](https://github.com/bisug/BinaryInspector) to see how it parses binaries!";
  }

  if (/telegram|githubbot|deargit|melody|wordgame|bot\b/.test(s)) {
    return "Telegram bots are Bisu's playground! Some favorites include [TG-GithubBot](https://github.com/bisug/TG-GithubBot) (live on Telegram as [DearGitNotifyBot](https://t.me/DearGitNotifyBot)) which streams GitHub push and deployment alerts, [Melody](https://github.com/bisug/Melody) for group call audio streaming, and [TG-WordGame](https://github.com/bisug/TG-WordGame) for multiplayer word challenges. Looking for custom bot development?";
  }

  if (/ninfo\b/.test(s)) {
    return "ninfo is a lightning-fast Linux telemetry CLI written in Nim. It queries kernel, memory, and hardware stats and dumps complete system telemetry as JSON in under a few milliseconds. You can check the [ninfo repository](https://github.com/bisug/ninfo)!";
  }

  // 3. General projects
  if (/project|built|build|work|portfolio|app|tool|cli\b/.test(s)) {
    return "Bisu loves creating practical tools that live in the terminal or on Telegram! Top highlights:\n[Paila](https://paila-prototype.vercel.app) (community travel platform for Nepal)\n[TG-GithubBot](https://t.me/DearGitNotifyBot) (real-time GitHub alerts in Telegram)\n[BinaryInspector](https://github.com/bisug/BinaryInspector) (safe ELF binary inspector)\n[ninfo](https://github.com/bisug/ninfo) (Linux system metrics in JSON)\nExplore the full interactive showcase on the [Projects page](https://bisu.com.np/projects)! Which one catches your eye?";
  }

  // 4. Skills and tech stack
  if (
    /skill|stack|tech|language|tool|code|framework|database|python|go|typescript|kurigram|fastapi/.test(
      s,
    )
  ) {
    return "Bisu's active core languages are Python, TypeScript, and Go. On the web and backend, he builds with FastAPI, Next.js, and Kurigram, backed by PostgreSQL, MongoDB, and Redis. He does almost everything inside Linux (Kali Linux and Linux Mint) with Docker. Take a tour of the full toolbelt on the [Tech Stack page](https://bisu.com.np/tech-stack)!";
  }

  // 5. Cyber security & education
  if (
    /security|cyber|hack|vulnerability|binary|lincoln|college|student|study|school|degree|education/.test(
      s,
    )
  ) {
    return "Bisu is studying Cyber Security and Network Technology at Lincoln International College in Kathmandu. His philosophy is that you learn how to protect systems by understanding how they break. He focuses on defensive architecture, secure automation, and binary analysis. Check out his academic background on the [Education page](https://bisu.com.np/education)!";
  }

  // 6. Hiring & internships
  if (/hire|intern|internship|job|opportunity|freelance|available|contract|work with/.test(s)) {
    return "Yes! Bisu is actively open to internships, freelance projects, and security-focused software work, especially around Telegram bots, automated CLI utilities, and full-stack web applications. Feel free to shoot him an [email](mailto:bisu.ghlan@gmail.com) or reach out on [LinkedIn](https://www.linkedin.com/in/bisug/) to talk details!";
  }

  // 7. Contact information
  if (/contact|email|reach|linkedin|github|instagram|social|talk|message/.test(s)) {
    return "You can get in touch with Bisu via [email](mailto:bisu.ghlan@gmail.com), explore his public code on [GitHub](https://github.com/bisug), or connect professionally on [LinkedIn](https://www.linkedin.com/in/bisug/). Head over to the [Contact page](https://bisu.com.np/contact) for direct links!";
  }

  // 8. Hackathons & experience
  if (/experience|hackathon|junction|build nepal|runtime terrors|team|competition/.test(s)) {
    return "Bisu loves the fast-paced intensity of hackathons! He teamed up with Runtime Terrors to build Paila at JunctionX Kathmandu (May 2026), and collaborated with Team Bugger on NetGuard at the Build Nepal Hackathon (August 2026). Check out the [Experience page](https://bisu.com.np/experience) for the full breakdown!";
  }

  // 9. Personal & hobbies
  if (
    /who (is|are)|about (bisu|him)|where|nepal|bhaktapur|hobby|hobbies|football|travel|anime/.test(
      s,
    )
  ) {
    return "Bisu Ghalan is a developer and security researcher from historic Bhaktapur, Nepal. When he is away from the keyboard, he is passionate about football, exploring hiking trails across Nepal, and watching anime.";
  }

  // 10. Jokes, fun facts, and Easter eggs
  if (/joke|funny|laugh/.test(s)) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! (Though Bisu made sure the light mode toggle on this portfolio looks ultra-smooth too!)";
  }

  if (/fun fact|easter egg|secret/.test(s)) {
    return "Fun fact: Bisu once wrote a complete Linux telemetry CLI in Nim (ninfo) just because standard shell scripts were taking more than 50 milliseconds to report system specs!";
  }

  if (/who are you|what are you|your name|bot\b/.test(s)) {
    return "I'm Bisu's virtual portfolio co-pilot! Think of me as your interactive guide: here to answer questions about his software, break down his tech stack, or help you connect with him.";
  }

  // 11. Natural fallback
  return "That is a great question! I know all about Bisu's Telegram bots, security tools, web projects, and technical skills. What specific part of his work would you like to explore?";
}

// Mirror of the server safeUrl(): never render javascript:/data: targets as
// links, even in the offline fallback path.
function safeUrl(raw: string): string | null {
  const url = raw.trim().replace(/[<>"'\s]/g, "");
  if (/^mailto:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(url)) return url;
  if (/^https?:\/\/[^/\s]+\.\S*$/i.test(url)) return url;
  if (/^[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?$/.test(url)) return `https://${url}`;
  return null;
}

// Mirror of the server sanitize(): strip markdown, keep validated links.
function clean(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, url: string) => {
      const safe = safeUrl(url);
      return safe ? `[${String(label).slice(0, 80)}](${safe})` : String(label);
    })
    .replace(/[*_`#>|]/g, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, 900);
}

// Render assistant replies: validated [label](url) links and bare URLs
// become safe anchors (target _blank, no opener); everything else stays text.
function Reply({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re =
    /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)]+)|mailto:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|(?<![\w@:/])([\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?)/gi;
  let last = 0;
  let key = 0;
  const pushLink = (label: string, href: string | null) => {
    if (!href) return false;
    parts.push(
      <a
        key={key++}
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="text-fun-accent underline underline-offset-2 hover:brightness-125 transition-colors font-medium"
      >
        {label}
      </a>,
    );
    return true;
  };
  let m: RegExpExecArray | null = re.exec(text);
  while (m !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1] !== undefined) {
      if (!pushLink(m[1], safeUrl(m[2]))) parts.push(m[1]);
    } else if (!pushLink(m[0], safeUrl(m[0]))) {
      parts.push(m[0]);
    }
    m = re.exec(text);
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span className="whitespace-pre-wrap break-words">{parts}</span>;
}

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hey! I'm Bisu's virtual companion. Ask me anything about his projects, cybersecurity experiments, tech stack, or what he's building next!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const idRef = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const msgCount = msgs.length;

  const closeChat = useCallback(() => {
    setOpen(false);
    toggleBtnRef.current?.focus();
  }, []);

  const resetChat = useCallback(() => {
    idRef.current = 1;
    setMsgs([
      {
        id: 0,
        role: "assistant",
        content:
          "Hey! I'm Bisu's virtual companion. Ask me anything about his projects, cybersecurity experiments, tech stack, or what he's building next!",
      },
    ]);
    setInput("");
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeChat();
        return;
      }
      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), a[href]",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeChat]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on any new message/open/loading tick.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgCount, open, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...msgs, { id: idRef.current++, role: "user", content: q }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      const data = (await res.json()) as { response?: string; error?: string };
      if (!data.response?.trim()) throw new Error(data.error ?? `http ${res.status}`);
      const cleaned = clean(data.response);
      setFailed(false);
      setMsgs([...next, { id: idRef.current++, role: "assistant", content: cleaned }]);
    } catch {
      setFailed(true);
      setMsgs([...next, { id: idRef.current++, role: "assistant", content: localReply(q) }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Bisu's AI assistant"
          className="flex h-[min(510px,75vh)] w-[min(375px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-fun-navy-darkest shadow-2xl shadow-black/70 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fun-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fun-accent" />
              </span>
              <div>
                <p className="text-xs font-bold text-white leading-none">Bisu AI Assistant</p>
                <p className="text-[10px] text-fun-gray-light leading-none mt-1">
                  Online &amp; ready
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="rounded-lg p-1.5 text-fun-gray hover:text-white hover:bg-white/10 transition-colors text-xs"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-fun-gray hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm" aria-live="polite">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed transition-all ${
                  m.role === "user"
                    ? "ml-auto bg-fun-accent text-fun-navy-darkest font-semibold rounded-br-sm shadow-md shadow-fun-accent/15"
                    : "bg-white/[0.06] text-fun-gray-light rounded-bl-sm border border-white/5"
                }`}
              >
                {m.role === "assistant" ? <Reply text={m.content || "..."} /> : m.content || "..."}
              </div>
            ))}
            {loading && msgs[msgs.length - 1]?.role === "user" && (
              <div className="flex items-center gap-1.5 max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/5 px-3.5 py-2.5 text-fun-gray">
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Contextual Suggestions Chips */}
          <div className="flex flex-wrap gap-1.5 px-4 pb-2 pt-1 border-t border-white/5 bg-white/[0.01]">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={loading}
                className="rounded-full border border-white/15 bg-white/[0.02] px-2.5 py-1 text-[11px] text-fun-gray-light hover:border-fun-accent hover:text-white hover:bg-white/[0.06] transition disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            className="flex gap-2 border-t border-white/10 p-3 bg-fun-navy-darkest"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message the assistant
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 1000))}
              placeholder="Ask about projects, bots, security..."
              autoComplete="off"
              maxLength={1000}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-fun-gray focus:border-fun-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-fun-accent px-3.5 py-2 text-xs sm:text-sm font-bold text-fun-navy-darkest hover:brightness-110 active:scale-95 transition disabled:opacity-50"
            >
              Send
            </button>
          </form>

          {/* Footer Note */}
          <p className="border-t border-white/10 px-4 py-1.5 text-center text-[10px] leading-tight text-fun-gray">
            {failed
              ? "Interactive answers · Live AI via Cloudflare Workers AI"
              : "Powered by Cloudflare Workers AI · Llama 3.3 70B"}
          </p>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        ref={toggleBtnRef}
        type="button"
        onClick={() => (open ? closeChat() : setOpen(true))}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-fun-accent text-fun-navy-darkest shadow-lg shadow-fun-accent/25 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition"
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
