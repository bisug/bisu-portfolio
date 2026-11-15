import { faqs } from "./content/faq";
import { education, events, hobbies, skills } from "./content/home";
import projects, { projectSlug } from "./content/projects";
import { SITE_DESC, SITE_URL, socials } from "./global";

export const projectPage = (project: (typeof projects)[number]) =>
  `${SITE_URL}/projects/${projectSlug(project)}`;

export const findProject = (title: string) =>
  projects.find(
    (project) => project.title.toLowerCase() === title.toLowerCase(),
  );

export const skillsSummary = skills.map((skill) => skill.title).join(", ");

export const hobbiesSummary = hobbies.join(", ");

const projectFacts = projects
  .map((project) => {
    const links = [
      `Page: ${projectPage(project)}`,
      project.github ? `Source: ${project.github}` : null,
      project.link ? `Live site: ${project.link}` : null,
    ]
      .filter(Boolean)
      .join(" | ");
    return `- ${project.title}: ${project.desc} ${links}`;
  })
  .join("\n");

const eventFacts = events
  .map(
    (event) =>
      `- ${event.title}: ${event.date}; ${event.team}; ${event.project}. ${event.projectDesc ?? ""} ${event.link ?? ""}`,
  )
  .join("\n");

const educationFacts = education
  .map(
    (item) => `- ${item.degree}; ${item.school}; ${item.period}. ${item.desc}`,
  )
  .join("\n");

const contactFacts = socials.map((social) => social.link).join(" | ");

export const ASSISTANT_CONTEXT = `
Profile: ${SITE_DESC}
Projects:
${projectFacts}
Experience:
${eventFacts}
Education:
${educationFacts}
Skills: ${skillsSummary}
Hobbies: ${hobbies.join(", ")}
FAQ:
${faqs.map((faq) => `- ${faq.question}: ${faq.answer}`).join("\n")}
Contact: ${contactFacts}
`;
