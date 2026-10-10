import Reveal from "@/components/utility/Reveal";
import { events } from "@/data/content/home";

function Experience() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 w-full pb-16">
      <section aria-labelledby="freelance-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <h2
            id="freelance-heading"
            className="font-mono text-xs sm:text-sm uppercase tracking-widest text-fun-accent font-semibold"
          >
            Freelance &amp; Work
          </h2>
          <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 transition-all duration-300 hover:border-fun-accent/40 hover:shadow-xl hover:shadow-fun-accent/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Freelance Developer
                </h3>
                <p className="text-sm sm:text-base text-fun-gray mt-1.5 leading-relaxed max-w-2xl">
                  Building Telegram bots, automation tools, and full-stack web applications for
                  clients and communities.
                </p>
              </div>
              <span className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 rounded-full border border-fun-accent/30 bg-fun-accent/10 px-3.5 py-1.5 text-xs font-semibold text-fun-accent shadow-sm">
                <span
                  className="h-2 w-2 rounded-full bg-fun-accent shadow-[0_0_6px_var(--color-fun-accent)]"
                  aria-hidden="true"
                />
                Open to internships
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="events-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <h2
            id="events-heading"
            className="font-mono text-xs sm:text-sm uppercase tracking-widest text-fun-accent font-semibold"
          >
            Hackathons &amp; Events
          </h2>
          <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {events.map((event, index) => (
            <Reveal key={event.title} delay={index * 100} className="h-full">
              <div
                className={`h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 ${
                  event.link
                    ? "hover:border-fun-accent/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-fun-accent/10"
                    : "hover:border-white/20"
                }`}
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug">
                    {event.link ? (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-fun-accent hover:underline decoration-fun-accent/40 underline-offset-4 transition"
                      >
                        {event.title}
                        <img
                          src="/static/icons/external-link.svg"
                          width={14}
                          height={14}
                          alt=""
                          aria-hidden="true"
                          className="icon-accent-light shrink-0"
                        />
                      </a>
                    ) : (
                      event.title
                    )}
                  </h3>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs sm:text-sm">
                    {(
                      [
                        ["Organizer", event.organizer],
                        ["Event date", event.date],
                        ["Venue", event.venue],
                        ["Team name", event.team],
                        ["Project name", event.project],
                        ["Status", event.status],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label} className="col-span-2 grid grid-cols-subgrid items-baseline">
                        <dt className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-fun-gray py-0.5">
                          {label}
                        </dt>
                        <dd className="text-fun-gray-light py-0.5 leading-snug">
                          {value}
                          {label === "Project name" && event.projectDesc && (
                            <span className="mt-1 block text-xs text-fun-gray leading-relaxed">
                              {event.projectDesc}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Experience;
