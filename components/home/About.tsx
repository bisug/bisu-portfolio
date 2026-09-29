import { hobbies } from "@/data/content/home";
import SectionTitle from "../global/SectionTitle";

function About() {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-12 w-full">
      <div className="md:max-w-xs lg:max-w-sm xl:max-w-md md:shrink-0">
        <SectionTitle title="A bit about me." />
        <p className="text-fun-gray text-sm sm:text-base -mt-4">
          Who I am, what I build, and what keeps me curious.
        </p>
      </div>
      <div className="flex-1 w-full space-y-6">
        <div className="space-y-4 text-fun-gray text-sm sm:text-base leading-relaxed 2xl:max-w-4xl">
          <p>
            I&apos;m a computer science student at Lincoln International College, Kathmandu, studying{" "}
            <strong className="text-white font-medium">
              Cyber Security &amp; Network Technology
            </strong>{" "}
            — and a security researcher who learns by breaking things before defending them.
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
        <div className="pt-4 border-t border-white/10">
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
    </div>
  );
}

export default About;
