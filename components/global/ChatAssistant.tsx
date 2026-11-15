import { useCallback, useEffect, useRef, useState } from "react";
import {
  findProject,
  hobbiesSummary,
  projectPage,
  skillsSummary,
} from "@/data/assistant";

type Role = "user" | "assistant";
type Msg = { id: number; role: Role; content: string; ts?: number };

const SUGGESTIONS = [
  "Why was tgcrypto-c forked?",
  "What does BinaryInspector inspect?",
  "What came out of JunctionX Kathmandu?",
  "How can I contact Bisu?",
];

const INITIAL_MESSAGE =
  "Ask about a project, Bisu's security work, or how to get in touch. I will stick to what is documented on this site.";

// Offline/local fallback so the widget still answers when /api/chat is
// unreachable (AI binding missing, adblocker, offline).
function localReply(q: string): string {
  const s = q.toLowerCase();
  const binaryInspector = findProject("BinaryInspector");
  const paila = findProject("Paila");
  const tgcrypto = findProject("tgcrypto-c");
  const ninfo = findProject("ninfo");

  // 1. Greetings
  if (
    /^(hi|hello|hey|yo|sup|namaste|morning|afternoon|evening|hola|howdy)(\b|\s)/.test(
      s,
    ) ||
    s === "hi" ||
    s === "hello" ||
    s === "hey"
  ) {
    const greetings = [
      "Namaste. Ask about a project, Bisu's security work, or how to get in touch.",
      "Hi. I can point you to the relevant project page or share what this portfolio documents.",
      "Hello. Try a specific project, the tech stack, or a question about Bisu's experience.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 2. Specific project queries
  if (/paila\b/.test(s) && paila) {
    return `${paila.desc} [Project page](${projectPage(paila)}).`;
  }

  if (/binary|inspector|elf\b/.test(s) && binaryInspector) {
    return `${binaryInspector.desc} [Project page](${projectPage(binaryInspector)}).`;
  }

  if (/\btgcrypto\b|\btelegram\b|\bcrypto\b/.test(s) && tgcrypto) {
    return `${tgcrypto.desc} [Project page](${projectPage(tgcrypto)}).`;
  }

  if (/ninfo\b/.test(s) && ninfo) {
    return `${ninfo.desc} [Project page](${projectPage(ninfo)}).`;
  }

  // 3. General projects
  if (
    /\bproject\b|\bbuilt\b|\bbuild\b|\bwork\b|\bportfolio\b|\bapp\b|\btool\b|\bcli\b/.test(
      s,
    )
  ) {
    return "The portfolio includes [BinaryInspector](https://bisu.com.np/projects/binary-inspector), [Paila](https://bisu.com.np/projects/paila), [tgcrypto-c](https://bisu.com.np/projects/tgcrypto-c), and [ninfo](https://bisu.com.np/projects/ninfo). The [Projects page](https://bisu.com.np/projects) has the full list.";
  }

  // 4. Skills and tech stack
  if (
    /\bskill\b|\bstack\b|\btech\b|\blanguage\b|\btool\b|\bcode\b|\bframework\b|\bdatabase\b|\bpython\b|\bgo\b|\btypescript\b|\bkurigram\b|\bfastapi\b/.test(
      s,
    )
  ) {
    return `Bisu works with ${skillsSummary}. Full breakdown on the [Tech Stack page](https://bisu.com.np/tech-stack).`;
  }

  // 5. Cyber security & education
  if (
    /\bsecurity\b|\bcyber\b|\bhack\b|\bvulnerability\b|\bbinary\b|\blincoln\b|\bcollege\b|\bstudent\b|\bstudy\b|\bschool\b|\bdegree\b|\beducation\b/.test(
      s,
    )
  ) {
    return "Bisu is studying Cyber Security & Network Technology at Lincoln International College in Kathmandu. The [Education page](https://bisu.com.np/education) has the documented course and school details.";
  }

  // 6. Hiring & internships
  if (
    /\bhire\b|\bintern\b|\binternship\b|\bjob\b|\bopportunity\b|\bfreelance\b|\bavailable\b|\bcontract\b|\bwork with\b/.test(
      s,
    )
  ) {
    return "Bisu is open to internships and freelance work. Reach him by [email](mailto:bisu.ghlan@gmail.com) or [LinkedIn](https://www.linkedin.com/in/bisug/).";
  }

  // 7. Contact information
  if (
    /\bcontact\b|\bemail\b|\breach\b|\blinkedin\b|\bgithub\b|\binstagram\b|\bsocial\b|\btalk\b|\bmessage\b/.test(
      s,
    )
  ) {
    return "Best ways to reach him: [email](mailto:bisu.ghlan@gmail.com), [GitHub](https://github.com/bisug), or [LinkedIn](https://www.linkedin.com/in/bisug/). The [Contact page](https://bisu.com.np/contact) has everything in one place.";
  }

  // 8. Hackathons & experience
  if (
    /\bexperience\b|\bhackathon\b|\bjunction\b|\bbuild nepal\b|\bruntime terrors\b|\bteam\b|\bcompetition\b/.test(
      s,
    )
  ) {
    return "At JunctionX Kathmandu in May 2026, Team Runtime Terrors built Paila. At Build Nepal in August 2026, Team Bugger built NetGuard. The [Experience page](https://bisu.com.np/experience) has the event details.";
  }

  // 9. Personal & hobbies
  if (
    /\bwho (is|are)\b|\babout (bisu|him)\b|\bwhere\b|\bnepal\b|\bbhaktapur\b|\bhobby\b|\bhobbies\b|\bfootball\b|\btravel\b|\banime\b/.test(
      s,
    )
  ) {
    return `Bisu is based in Bhaktapur, Nepal. Outside of work, he enjoys ${hobbiesSummary}.`;
  }

  // 10. Jokes, fun facts, and Easter eggs
  if (/\bjoke\b|\bfunny\b|\blaugh\b/.test(s)) {
    return "Why do programmers prefer dark mode? Light attracts bugs.";
  }

  if (/\bfun fact\b|\beaster egg\b|\bsecret\b/.test(s)) {
    return "ninfo started as an exploration of Nim. It returns a Linux system snapshot as JSON in one call, without root access or dependencies.";
  }

  if (/\bwho are you\b|\bwhat are you\b|\byour name\b|\bbot\b/.test(s)) {
    return "I am the guide for this portfolio. I can answer from the projects, experience, education, and contact details published here.";
  }

  // 11. Natural fallback
  return "I do not have that detail in the portfolio. Try a project name, Bisu's tech stack, experience, or contact information.";
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
      content: INITIAL_MESSAGE,
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [_rateLimited, setRateLimited] = useState(false);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
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
        content: INITIAL_MESSAGE,
        ts: Date.now(),
      },
    ]);
    setInput("");
    setFailed(false);
    setRateLimited(false);
    setLastFailed(null);
    inputRef.current?.focus();
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
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (
        dialogRef.current &&
        !dialogRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeChat();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeChat]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on any new message/open/loading tick.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgCount, open, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [
      ...msgs,
      { id: idRef.current++, role: "user", content: q, ts: Date.now() },
    ];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next
            .slice(-10)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (res.status === 429) {
        setRateLimited(true);
        setLastFailed(q);
        setMsgs([
          ...next,
          {
            id: idRef.current++,
            role: "assistant",
            content:
              "Slow down a bit — too many requests. Try again in a minute, or ask me something else.",
          },
        ]);
        return;
      }
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      const data = (await res.json()) as { response?: string; error?: string };
      if (!data.response?.trim())
        throw new Error(data.error ?? `http ${res.status}`);
      const cleaned = clean(data.response);
      setFailed(false);
      setRateLimited(false);
      setLastFailed(null);
      setMsgs([
        ...next,
        {
          id: idRef.current++,
          role: "assistant",
          content: cleaned,
          ts: Date.now(),
        },
      ]);
    } catch {
      setFailed(true);
      setLastFailed(q);
      setMsgs([
        ...next,
        {
          id: idRef.current++,
          role: "assistant",
          content: localReply(q),
          ts: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio guide for Bisu Ghalan"
          className="flex h-[min(540px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-fun-navy-darkest shadow-2xl shadow-black/70 animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
            <div>
              <p className="text-xs font-bold text-white leading-none">
                Portfolio guide
              </p>
              <p className="text-[10px] text-fun-gray-light leading-none mt-1">
                Grounded in this site
              </p>
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
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Conversation"
          >
            {msgs.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"
                }
              >
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed transition-all ${
                    m.role === "user"
                      ? "bg-fun-accent text-fun-navy-darkest font-semibold rounded-br-sm shadow-md shadow-fun-accent/15"
                      : "bg-white/[0.06] text-fun-gray-light rounded-bl-sm border border-white/5"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <Reply text={m.content || "..."} />
                  ) : (
                    m.content || "..."
                  )}
                </div>
                {m.ts && (
                  <p
                    className={`mt-1 text-[10px] text-fun-gray ${m.role === "user" ? "text-right" : ""}`}
                  >
                    {new Date(m.ts).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            ))}
            {loading && msgs[msgs.length - 1]?.role === "user" && (
              <div className="flex items-center gap-2 max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/5 px-3.5 py-2.5 text-fun-gray">
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fun-accent animate-pulse" />
                <span className="text-xs">Checking the portfolio</span>
              </div>
            )}
            {failed && lastFailed && !loading && (
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => send(lastFailed)}
                  className="rounded-lg border border-fun-accent/40 px-3 py-1.5 text-xs text-fun-accent hover:bg-fun-accent hover:text-fun-navy-darkest transition"
                >
                  Retry last message
                </button>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Specific examples make the first turn easier without pretending to know intent. */}
          {msgs.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2 pt-1 border-t border-white/5 bg-white/[0.01]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={loading}
                  className="min-h-[44px] rounded-lg border border-white/15 bg-white/[0.02] px-3.5 py-2 text-left text-xs text-fun-gray-light hover:border-fun-accent hover:text-white hover:bg-white/[0.06] transition disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

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
              placeholder="Ask a specific question"
              autoComplete="off"
              maxLength={1000}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base sm:text-sm text-white placeholder:text-fun-gray focus:border-fun-accent focus-visible:outline-2 focus-visible:outline-fun-accent focus-visible:outline-offset-2"
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
              ? "Local portfolio answers"
              : "Portfolio facts plus Cloudflare Workers AI"}
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
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
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
