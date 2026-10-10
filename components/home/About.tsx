import PageHeading from "@/components/global/PageHeading";
import { hobbies } from "@/data/content/home";

function About() {
  return (
    <div className="w-full">
      <PageHeading
        as="h2"
        title="About Me"
        doodle="/static/doodles/testimonials/squiggle2.svg"
        doodleClassName="w-8 sm:w-10 -top-6 -right-4 sm:-top-8 sm:-right-8 absolute select-none pointer-events-none"
        subtitle="Who I am, what I build, and what keeps me curious."
        className="py-8 sm:py-12"
      />
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4 text-fun-gray text-sm sm:text-base leading-relaxed">
          <p>
            I&apos;m a computer science student at Lincoln International College in Kathmandu,
            specializing in{" "}
            <strong className="text-white font-medium">
              Cyber Security &amp; Network Technology
            </strong>
            . For me, security isn&apos;t just theory; the best way to protect an application is to
            understand exactly how it fails under real-world pressure.
          </p>
          <p>
            Most of my time goes into writing{" "}
            <strong className="text-white font-medium">Python, Go, or TypeScript</strong>. I build
            software people rely on daily, ranging from high-throughput{" "}
            <strong className="text-white font-medium">Telegram bots</strong> and lightning-fast{" "}
            <strong className="text-white font-medium">CLI tools</strong> to hackathon-winning{" "}
            <strong className="text-white font-medium">web platforms</strong> built under tight
            sprint deadlines.
          </p>
          <p>
            Based in <strong className="text-white font-medium">Bhaktapur, Nepal</strong>. I&apos;m
            actively <strong className="text-fun-accent font-medium">seeking internships</strong>{" "}
            where I can ship resilient production code.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-mono text-xs uppercase tracking-widest text-fun-accent font-semibold mb-4">
            Off the keyboard
          </h3>
          <ul className="flex flex-wrap justify-center gap-2 list-none">
            {hobbies.map((hobby) => (
              <li
                key={hobby}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-fun-gray-light hover:border-fun-accent/40 hover:text-white transition-colors duration-150"
              >
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
