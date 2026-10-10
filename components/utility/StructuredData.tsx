import { education, skills } from "@/data/content/home";
import projects, { projectSlug } from "@/data/content/projects";
import { SITE_DESC, SITE_NAME, SITE_URL, socials } from "@/data/global";

type StructuredDataProps = {
  path: string;
  title: string;
  desc: string;
  extra?: Record<string, unknown>[];
};

/**
 * JSON-LD for the site entity: who the site is about (Person), what the site
 * is (WebSite/WebPage), and, on the projects page, the works themselves.
 * Answer engines and search engines both read this instead of guessing from prose.
 */
function StructuredData({ path, title, desc, extra = [] }: StructuredDataProps) {
  const personId = `${SITE_URL}/#person`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Developer & Security Researcher",
      description: SITE_DESC,
      email: socials.find((social) => social.link.startsWith("mailto:"))?.link.slice(7),
      image: `${SITE_URL}/static/misc/og.png`,
      knowsLanguage: ["en", "ne"],
      address: { "@type": "PostalAddress", addressLocality: "Bhaktapur", addressCountry: "NP" },
      sameAs: socials
        // Own site URL is already `url` above: sameAs is for profiles elsewhere.
        .filter((social) => social.link.startsWith("http") && social.link !== SITE_URL)
        .map((s) => s.link),
      knowsAbout: skills.map((skill) => skill.title),
      alumniOf: education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.school,
        url: item.link,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      inLanguage: "en",
      author: { "@id": personId },
    },
    {
      // The homepage represents the person's profile, not a generic page.
      "@type": path === "/" ? "ProfilePage" : "WebPage",
      "@id": `${SITE_URL}${path}#webpage`,
      url: `${SITE_URL}${path}`,
      name: title,
      description: desc,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": personId },
      mainEntity:
        path === "/"
          ? { "@id": personId }
          : path.startsWith("/projects/") && !path.startsWith("/projects/tag/")
            ? { "@id": `${SITE_URL}${path}#software` }
            : undefined,
    },
  ];

  if (path !== "/") {
    const parts = path.split("/").filter(Boolean);
    const cleanTitle = title.replace(/ - Bisu Ghalan$/, "");
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
    ];

    if (parts[0] === "projects") {
      if (parts.length === 1) {
        breadcrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE_URL}/projects`,
        });
      } else {
        breadcrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE_URL}/projects`,
        });
        breadcrumbs.push({
          "@type": "ListItem",
          position: 3,
          name: cleanTitle,
          item: `${SITE_URL}${path}`,
        });
      }
    } else {
      breadcrumbs.push({
        "@type": "ListItem",
        position: 2,
        name: cleanTitle,
        item: `${SITE_URL}${path}`,
      });
    }

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${path}#breadcrumbs`,
      itemListElement: breadcrumbs,
    });
  }

  if (path === "/projects") {
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/projects#list`,
      name: `Projects by ${SITE_NAME}`,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          "@id": `${SITE_URL}/projects/${projectSlug(project)}#software`,
          name: project.title,
          description: project.desc,
          url: `${SITE_URL}/projects/${projectSlug(project)}`,
          codeRepository: project.github,
          sameAs: project.link,
          programmingLanguage: project.tags[0],
          keywords: project.tags.join(", "),
          author: { "@id": personId },
        },
      })),
    });
  }

  graph.push(...extra);

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps a "</script>" inside any future description from
      // closing this tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}

export default StructuredData;
