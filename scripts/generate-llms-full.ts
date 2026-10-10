import { writeFileSync } from "node:fs";
import { faqs } from "@/data/content/faq";
import { education, events, skills } from "@/data/content/home";
import projects, { projectSlug } from "@/data/content/projects";
import { SITE_DESC, SITE_NAME, SITE_URL, socials } from "@/data/global";

/**
 * Generates public/llms-full.txt from data sources.
 * Run via: bun scripts/generate-llms-full.ts
 */
const projectsMarkdown = projects
  .map((p) => {
    const slug = projectSlug(p);
    const lines = [
      `### ${p.title}`,
      "",
      p.desc,
      "",
      `- Page: ${SITE_URL}/projects/${slug}`,
      p.github ? `- Source Code: ${p.github}` : null,
      p.link ? `- Live Deployment: ${p.link}` : null,
      `- Technologies: ${p.tags.join(", ")}`,
    ].filter(Boolean);
    return lines.join("\n");
  })
  .join("\n\n");

const eventsMarkdown = events
  .map((e) => {
    const lines = [
      `### ${e.title}`,
      "",
      `- Organizer: ${e.organizer}`,
      `- Date: ${e.date}`,
      `- Venue: ${e.venue}`,
      `- Team: ${e.team}`,
      `- Project: ${e.project}`,
      e.projectDesc ? `- Project Summary: ${e.projectDesc}` : null,
      `- Status: ${e.status}`,
      e.link ? `- Event Link: ${e.link}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  })
  .join("\n\n");

const educationMarkdown = education
  .map((item) => {
    const lines = [
      `### ${item.degree}`,
      "",
      `- Institution: ${item.school}`,
      `- Period: ${item.period}`,
      item.desc ? `- Focus: ${item.desc}` : null,
      item.link ? `- Website: ${item.link}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  })
  .join("\n\n");

const categorySkills = (cat: string) =>
  skills
    .filter((s) => s.category === cat)
    .map((s) => s.title)
    .join(", ");

const skillsMarkdown = [
  `- **Languages**: ${categorySkills("Languages")}`,
  `- **Frameworks & Web**: ${categorySkills("Frameworks & Web")}`,
  `- **Databases**: ${categorySkills("Databases")}`,
  `- **AI & Tools**: ${categorySkills("AI & Tools")}`,
  `- **Systems & Ops**: ${categorySkills("Systems & Ops")}`,
].join("\n");

const faqsMarkdown = faqs.map((f) => `### Q: ${f.question}\n\nA: ${f.answer}`).join("\n\n");

const socialsMarkdown = socials.map((s) => `- ${s.name}: ${s.link}`).join("\n");

const content = `# ${SITE_NAME}: Complete Profile & Knowledge Base

> ${SITE_DESC}

- Website: ${SITE_URL}
- Canonical Entity: ${SITE_NAME}
- Location: Bhaktapur, Nepal (UTC+5:45)
- Year: ${new Date().getFullYear()}

---

## About & Background

Bisu Ghalan is a computer science student at Lincoln International College in Kathmandu (affiliated with Lincoln University College, Malaysia), studying Cyber Security & Network Technology (Hons).
He is a security researcher and software developer who focuses on defensive security, network infrastructure, Telegram bots, command-line utilities, and full-stack web applications.

---

## Projects

${projectsMarkdown}

---

## Hackathons & Competitive Experience

${eventsMarkdown}

---

## Education

${educationMarkdown}

---

## Technical Skills & Toolbelt

${skillsMarkdown}

---

## Frequently Asked Questions (FAQ)

${faqsMarkdown}

---

## Contact & Social Profiles

${socialsMarkdown}
`;

writeFileSync(new URL("../public/llms-full.txt", import.meta.url), content);
console.log("llms-full: wrote public/llms-full.txt successfully");
