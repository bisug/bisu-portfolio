import { writeFileSync } from "node:fs";
import { contactFaqs, education, events, skills } from "@/data/content/home";
import projects, { projectSlug } from "@/data/content/projects";
import { COPYRIGHT_YEAR, SITE_DESC, SITE_NAME, SITE_URL, socials } from "@/data/global";

/**
 * Generates public/llms-full.txt containing the entire site knowledge base
 * in a clean, consolidated Markdown format for LLMs, RAG pipelines, and answer engines.
 */

const lines: string[] = [
  `# ${SITE_NAME} — Complete Profile & Knowledge Base`,
  "",
  `> ${SITE_DESC}`,
  "",
  `- Website: ${SITE_URL}`,
  `- Canonical Entity: ${SITE_NAME}`,
  `- Location: Bhaktapur, Nepal (UTC+5:45)`,
  `- Year: ${COPYRIGHT_YEAR}`,
  "",
  "---",
  "",
  "## About & Background",
  "",
  "Bisu Ghalan is a computer science student at Lincoln International College in Kathmandu (affiliated with Lincoln University College, Malaysia), studying Cyber Security & Network Technology (Hons).",
  "He is a security researcher and software developer who focuses on defensive security, network infrastructure, Telegram bots, command-line utilities, and full-stack web applications.",
  "",
  "---",
  "",
  "## Projects",
  "",
];

for (const p of projects) {
  const slug = projectSlug(p);
  lines.push(`### ${p.title}`);
  lines.push("");
  lines.push(p.desc);
  lines.push("");
  lines.push(`- Page: ${SITE_URL}/projects/${slug}`);
  if (p.github) lines.push(`- Source Code: ${p.github}`);
  if (p.link) lines.push(`- Live Deployment: ${p.link}`);
  lines.push(`- Technologies: ${p.tags.join(", ")}`);
  lines.push("");
}

lines.push("---", "", "## Hackathons & Competitive Experience", "");

for (const ev of events) {
  lines.push(`### ${ev.title}`);
  lines.push("");
  lines.push(`- Organizer: ${ev.organizer}`);
  lines.push(`- Date: ${ev.date}`);
  lines.push(`- Venue: ${ev.venue}`);
  lines.push(`- Team: ${ev.team}`);
  lines.push(`- Project: ${ev.project}`);
  if (ev.projectDesc) lines.push(`- Project Summary: ${ev.projectDesc}`);
  lines.push(`- Status: ${ev.status}`);
  if (ev.link) lines.push(`- Event Link: ${ev.link}`);
  lines.push("");
}

lines.push("---", "", "## Education", "");

for (const ed of education) {
  lines.push(`### ${ed.degree}`);
  lines.push("");
  lines.push(`- Institution: ${ed.school}`);
  lines.push(`- Period: ${ed.period}`);
  if (ed.desc) lines.push(`- Focus: ${ed.desc}`);
  if (ed.link) lines.push(`- Website: ${ed.link}`);
  lines.push("");
}

lines.push("---", "", "## Technical Skills & Toolbelt", "");

const categories = [...new Set(skills.map((s) => s.category))];
for (const cat of categories) {
  const items = skills.filter((s) => s.category === cat).map((s) => s.title);
  lines.push(`- **${cat}**: ${items.join(", ")}`);
}
lines.push("");

lines.push("---", "", "## Frequently Asked Questions (FAQ)", "");

for (const faq of contactFaqs) {
  lines.push(`### Q: ${faq.question}`);
  lines.push("");
  lines.push(`A: ${faq.answer}`);
  lines.push("");
}

lines.push("---", "", "## Contact & Social Profiles", "");

for (const soc of socials) {
  lines.push(`- ${soc.name}: ${soc.link}`);
}
lines.push("");

const content = lines.join("\n");
writeFileSync(new URL("../public/llms-full.txt", import.meta.url), content);
console.log(`llms-full: wrote complete knowledge base to public/llms-full.txt`);
