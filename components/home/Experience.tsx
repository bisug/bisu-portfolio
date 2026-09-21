import { events } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function Experience() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
      <div className="lg:max-w-sm lg:shrink-0">
        <SectionTitle title="Work experience." as="h1" />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          What I&apos;ve been up to, professionally and competitively.
        </p>
      </div>
      <div className="flex-1 w-full space-y-10">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-fun-gray mb-3">
            Freelancing
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <p className="text-sm sm:text-base leading-relaxed">
              Freelancing — building Telegram bots and full-stack apps for clients and communities.
            </p>
            <p className="mt-2.5 inline-block rounded-md bg-fun-accent/10 px-2.5 py-1 text-xs font-semibold text-fun-accent">
              Currently searching for internship opportunities
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-fun-gray mb-3">Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.title}
                className={`rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition ${
                  event.link ? "hover:border-fun-accent/60" : ""
                }`}
              >
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-fun-accent underline decoration-fun-accent/40 underline-offset-2 transition hover:decoration-fun-accent"
                    >
                      {event.title}
                      <img
                        src="/static/icons/external-link.svg"
                        width={14}
                        height={14}
                        alt=""
                        aria-hidden="true"
                        className="icon-accent-light"
                      />
                    </a>
                  ) : (
                    event.title
                  )}
                </h3>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
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
                    <div key={label} className="col-span-2 grid grid-cols-subgrid">
                      <dt className="font-mono text-xs uppercase tracking-wider text-fun-gray py-0.5">
                        {label}
                      </dt>
                      <dd className="text-fun-gray-light py-0.5">
                        {value}
                        {label === "Project name" && event.projectDesc && (
                          <span className="mt-0.5 block text-xs text-fun-gray">
                            {event.projectDesc}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
