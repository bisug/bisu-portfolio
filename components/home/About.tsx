import { hobbies } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function About() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <SectionTitle title="A bit about me." />
      <div className="space-y-4 text-fun-gray text-sm sm:text-base leading-relaxed -mt-4">
        <p>
          I&apos;m a computer science student at Lincoln International College, Kathmandu, studying
          Cyber Security &amp; Network Technology — and a security researcher who learns by breaking
          things before defending them.
        </p>
        <p>
          Most of my time goes into building: Telegram bots, CLI tools, and full-stack apps,
          usually in Python, Go, Rust, or TypeScript. I&apos;ve freelanced for clients and
          communities, and I show up to hackathons for the deadline pressure.
        </p>
        <p>
          Based in Bhaktapur, Nepal. Currently looking for internships where I can build and secure
          real systems.
        </p>
      </div>
      <div className="mt-8">
        <h3 className="font-mono text-xs uppercase tracking-widest text-fun-gray mb-3">
          Off the keyboard
        </h3>
        <ul className="flex flex-wrap gap-1.5 list-none">
          {hobbies.map((hobby) => (
            <li
              key={hobby}
              className="rounded-md bg-fun-navy px-2.5 py-1.5 text-xs text-fun-gray-light"
            >
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
