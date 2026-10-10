import PageHeading from "@/components/global/PageHeading";
import { hobbies } from "@/data/content/home";

function About() {
  return (
    <div className="w-full">
      <PageHeading
        as="h2"
        title="About Me"
        doodle="/static/doodles/testimonials/squiggle2.svg"
        subtitle="Who I am, what I build, and what keeps me curious."
        className="py-8 sm:py-12"
      />
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4 text-fun-gray text-sm sm:text-base leading-relaxed">
          <p>
            I&apos;m a computer science student at Lincoln International College, Kathmandu,
            studying{" "}
            <strong className="text-white font-medium">
              Cyber Security &amp; Network Technology
            </strong>
            , and a security researcher who learns by breaking things before defending them.
          </p>
          <p>
            Most of my time goes into building:{" "}
            <strong className="text-white font-medium">Telegram bots</strong>,{" "}
            <strong className="text-white font-medium">CLI tools</strong>, and{" "}
            <strong className="text-white font-medium">full-stack apps</strong>, usually in{" "}
            <strong className="text-white font-medium">Python, Go, Rust, or TypeScript</strong>.
            I&apos;ve freelanced for clients and communities, and I show up to hackathons for the
            deadline pressure.
          </p>
          <p>
            Based in <strong className="text-white font-medium">Bhaktapur, Nepal</strong>. Currently{" "}
            <strong className="text-fun-accent font-medium">looking for internships</strong> where I
            can build and secure real systems.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-mono text-xs uppercase tracking-widest text-fun-gray mb-4">
            Off the keyboard
          </h3>
          <ul className="flex flex-wrap justify-center gap-2 list-none">
            {hobbies.map((hobby) => (
              <li
                key={hobby}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-fun-gray-light hover:border-fun-accent/40 hover:text-white transition"
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
