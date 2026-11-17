import { useCallback, useEffect, useRef, useState } from "react";
import {
  findProject,
  hobbiesSummary,
  projectPage,
  skillsSummary,
} from "@/data/assistant";

type Role = "user" | "assistant";
type Msg = { id: number; role: Role; content: string; ts?: number };

const STARTERS = [
  { label: "Projects", prompt: "What projects has Bisu built?" },
  {
    label: "Skills & security",
    prompt: "What are Bisu's skills and security interests?",
  },
  {
    label: "Experience",
    prompt: "Tell me about Bisu's experience and hackathons.",
  },
  { label: "Contact", prompt: "How can I contact Bisu?" },
];

const INITIAL_MESSAGE =
  "I can help you find projects, experience, and contact details from this site.";
const RATE_LIMIT_MS = 60_000;

function isPortfolioLink(href: string) {
  try {
    const host = new URL(href, window.location.origin).hostname;
    return host === "bisu.com.np" || host === "www.bisu.com.np";
  } catch {
    return false;
  }
}

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

// Mirror of the server sanitize(): strip markdown and thinking tags, keep validated links.
function clean(text: string): string {
  return text
    .replace(/<thought>[\s\S]*?<\/thought>/gi, "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<(thought|think)>[\s\S]*$/gi, "")
    .replace(/<\/?(thought|think)>/gi, "")
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
    const opensInNewTab = !href.startsWith("mailto:") && !isPortfolioLink(href);
    parts.push(
      <a
        key={key++}
        href={href}
        target={opensInNewTab ? "_blank" : undefined}
        rel={opensInNewTab ? "noopener noreferrer" : undefined}
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
  const [rateLimitUntil, setRateLimitUntil] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const idRef = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const msgCount = msgs.length;
  const retrySeconds = rateLimitUntil
    ? Math.max(0, Math.ceil((rateLimitUntil - now) / 1000))
    : 0;
  const rateLimited = retrySeconds > 0;

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
    setRateLimitUntil(null);
    setLastFailed(null);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!rateLimitUntil) return;
    const updateTimer = () => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= rateLimitUntil) setRateLimitUntil(null);
    };
    updateTimer();
    const timer = window.setInterval(updateTimer, 1_000);
    return () => window.clearInterval(timer);
  }, [rateLimitUntil]);

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
    if (!q || loading || rateLimited) return;
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
        setFailed(false);
        setRateLimitUntil(Date.now() + RATE_LIMIT_MS);
        setInput(q);
        setMsgs(msgs);
        return;
      }
      if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
      const data = (await res.json()) as { response?: string; error?: string };
      if (!data.response?.trim())
        throw new Error(data.error ?? `http ${res.status}`);
      const cleaned = clean(data.response);
      setFailed(false);
      setRateLimitUntil(null);
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
          className="flex h-[min(540px,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-card border border-line-strong bg-paper shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none sm:h-[min(540px,75vh)] sm:w-[380px]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2">
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-faint">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${failed ? "bg-signal" : "bg-accent"}`}
              />
              {failed
                ? "Portfolio guide (offline)"
                : "Powered by Cloudflare Workers AI"}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink"
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
                className="flex h-11 w-11 items-center justify-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink"
              >
                ✕
              </button>
            </div>
          </div>

          {failed && (
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-signal/20 bg-signal/10 px-4 py-2 text-xs text-muted"
              role="status"
            >
              <span className="min-w-[190px] flex-1">
                AI is unavailable. Replies are from the portfolio guide.
              </span>
              {lastFailed && (
                <button
                  type="button"
                  onClick={() => send(lastFailed)}
                  disabled={loading || rateLimited}
                  className="min-h-11 shrink-0 font-semibold text-accent underline underline-offset-2 transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Try AI again
                </button>
              )}
            </div>
          )}

          {rateLimited && (
            <div
              className="border-b border-accent/20 bg-accent/10 px-4 py-2 text-xs text-muted"
              role="status"
            >
              Too many requests. Your message is ready to send in {retrySeconds}
              s.
            </div>
          )}

          {/* Messages Container */}
          <div
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3 text-sm"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Conversation"
            aria-busy={loading}
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
                      ? "bg-accent text-on-accent font-semibold rounded-br-sm shadow-md shadow-accent/15"
                      : "bg-surface text-muted rounded-bl-sm border border-line"
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
                    className={`mt-1 text-[10px] text-faint ${m.role === "user" ? "text-right" : ""}`}
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
              <div
                className="flex h-10 items-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface px-4"
                role="status"
              >
                <span className="sr-only">Assistant is responding</span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-fun-accent motion-reduce:animate-none [animation-delay:-0.3s]"
                />
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-fun-accent motion-reduce:animate-none [animation-delay:-0.15s]"
                />
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-fun-accent motion-reduce:animate-none"
                />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {msgs.length <= 1 && (
            <div className="border-t border-line bg-surface px-4 pb-3 pt-2">
              <p className="mb-2 text-xs text-muted">
                What would you like to explore?
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {STARTERS.map(({ label, prompt }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => send(prompt)}
                    disabled={loading || rateLimited}
                    aria-label={`Ask about ${label}`}
                    className="min-h-12 rounded-control border border-line-strong bg-paper px-3 py-2 text-left text-xs font-semibold text-muted transition hover:border-accent hover:bg-surface hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            className="flex gap-2 border-t border-line bg-paper p-3"
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
              placeholder="Ask about a project or experience"
              autoComplete="off"
              maxLength={1000}
              className="min-h-11 min-w-0 flex-1 rounded-control border border-line-strong bg-surface px-3 py-2 text-base text-ink placeholder:text-faint focus:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading || rateLimited || !input.trim()}
              aria-label={
                rateLimited
                  ? `Wait ${retrySeconds} seconds to send`
                  : "Send message"
              }
              title={
                rateLimited ? `Wait ${retrySeconds} seconds` : "Send message"
              }
              className="flex min-h-11 min-w-11 items-center justify-center rounded-control bg-accent p-2 text-on-accent hover:brightness-110 active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        ref={toggleBtnRef}
        type="button"
        onClick={() => (open ? closeChat() : setOpen(true))}
        aria-label={
          open ? "Close AI assistant" : "Ask about Bisu, open AI assistant"
        }
        aria-expanded={open}
        className="group relative flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 text-on-accent shadow-lg shadow-accent/20 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition"
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
        {!open && <span className="text-sm font-bold">Ask about Bisu</span>}
      </button>
    </div>
  );
}

export default ChatAssistant;
