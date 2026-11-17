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
        <div className="border-l-2 border-line pl-5 sm:pl-7 space-y-4 text-muted text-sm sm:text-base leading-relaxed">
          <p>
            I&apos;m a computer science student at Lincoln International College
            in Kathmandu, specializing in{" "}
            <strong className="text-ink font-medium">
              Cyber Security &amp; Network Technology
            </strong>
            . I learn to defend systems by understanding how they break.
          </p>
          <p>
            Most of my time goes into{" "}
            <strong className="text-ink font-medium">
              Python, Go, or TypeScript
            </strong>
            . I build CLI tools, crypto libraries, and web apps.
          </p>
          <p>
            Based in{" "}
            <strong className="text-ink font-medium">Bhaktapur, Nepal</strong>.
            Open to internships.
          </p>
        </div>
        <div className="text-center">
          <h3 className="eyebrow mb-4">Hobbies</h3>
          <ul className="flex flex-wrap justify-center gap-2 list-none">
            {hobbies.map((hobby) => (
              <li
                key={hobby}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted"
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
