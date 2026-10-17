/**
 * Dependency-free helpers that power the machine-readable surfaces of the site
 * (Markdown content negotiation, llms.txt, JSON-LD, Markdown 404s).
 *
 * This file deliberately imports nothing so it can run in the Edge runtime,
 * in a Node test runner, and inside React Server Components alike.
 */

export const SITE = {
  name: "Sidd",
  url: "https://sidd.studio",
  title: "Sidd — Developer, Filmmaker & Lighting Designer",
  tagline: "I code, produce films, design lights, and more.",
  description:
    "Sidd is a developer, filmmaker and lighting designer in Portland, Oregon. The site collects his coding projects, freelance and internship work, films, lightshows and awards.",
  email: "hello@sidd.studio",
  city: "Portland",
  region: "OR",
  regionName: "Oregon",
  country: "US",
  github: "https://github.com/Sidd-underscore",
  youtube: "https://youtube.com/@sidd-underscore",
};

/** Machine-readable surfaces, advertised from llms.txt and the Markdown 404. */
export const AGENT_FILES = {
  llms: "/llms.txt",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
};

export const MARKDOWN_MEDIA_TYPE = "text/markdown; charset=utf-8";

const MARKDOWN_TYPES = new Set(["text/markdown", "text/x-markdown"]);

/**
 * Parses an HTTP `Accept` header into `{ type, q }` entries. Unparseable
 * q-values fall back to 1, as RFC 9110 requires.
 */
export function parseAccept(header) {
  if (!header) return [];

  return header
    .split(",")
    .map((part) => {
      const [rawType, ...params] = part.split(";");
      const type = rawType.trim().toLowerCase();
      if (!type) return null;

      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=");
        if (key?.trim().toLowerCase() !== "q") continue;
        const parsed = Number.parseFloat(value);
        if (Number.isFinite(parsed)) q = Math.min(Math.max(parsed, 0), 1);
      }

      return { type, q };
    })
    .filter(Boolean);
}

/**
 * True when the client asked for Markdown *and* ranked it at least as highly as
 * HTML. A plain `*\/*`, or a browser's `text/html,...`, stays on HTML.
 */
export function prefersMarkdown(header) {
  const entries = parseAccept(header);
  if (entries.length === 0) return false;

  let markdownQ = 0;
  let htmlQ = 0;

  for (const { type, q } of entries) {
    if (MARKDOWN_TYPES.has(type)) markdownQ = Math.max(markdownQ, q);
    else if (type === "text/html" || type === "application/xhtml+xml")
      htmlQ = Math.max(htmlQ, q);
  }

  if (markdownQ === 0) return false;
  return markdownQ >= htmlQ;
}

/** `/sitemap.xml`, `/llms.txt`, `/images/x.png`: served as-is, never rewritten. */
function isFileRequest(pathname) {
  return /\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith(".md");
}

/**
 * The content-negotiation decision for one request, kept here so it can be
 * tested without the Edge runtime. `proxy.js` is a thin shell over it.
 */
export function resolveMarkdownRequest(pathname, acceptHeader) {
  if (pathname.endsWith(".md")) {
    return { markdown: true, path: normalizePath(pathname) };
  }

  if (!isFileRequest(pathname) && prefersMarkdown(acceptHeader)) {
    return { markdown: true, path: normalizePath(pathname) };
  }

  return { markdown: false, path: normalizePath(pathname) };
}

/** Normalises a request path so `/about`, `/about/` and `/about.md` agree. */
export function normalizePath(path) {
  if (!path) return "/";
  let normalized = path.split("?")[0].split("#")[0];
  if (!normalized.startsWith("/")) normalized = "/" + normalized;
  if (normalized.length > 1) normalized = normalized.replace(/\/+$/, "");
  if (normalized.endsWith(".md")) normalized = normalized.slice(0, -3);
  if (normalized.length > 1) normalized = normalized.replace(/\/+$/, "");
  return normalized || "/";
}

export function absoluteUrl(path = "/") {
  return SITE.url + (path === "/" ? "" : normalizePath(path));
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                    */
/* -------------------------------------------------------------------------- */

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: SITE.city,
  addressRegion: SITE.region,
  addressCountry: SITE.country,
};

const SAME_AS = [SITE.github, SITE.youtube];

/**
 * A single `@graph` covering the three identity types agents look for on a
 * personal site: the Person, the one-person studio behind the domain, and the
 * WebSite itself.
 */
export function buildJsonLd() {
  const personId = SITE.url + "/#person";
  const organizationId = SITE.url + "/#organization";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: SITE.url,
        email: "mailto:" + SITE.email,
        description: SITE.description,
        jobTitle: ["Web Developer", "Filmmaker", "Lighting Designer"],
        knowsAbout: [
          "Web development",
          "Next.js",
          "React",
          "TailwindCSS",
          "Lighting design",
          "Filmmaking",
          "Live A/V and livestreaming",
        ],
        address: POSTAL_ADDRESS,
        sameAs: SAME_AS,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE.name,
        alternateName: "Sidd Studio",
        url: SITE.url,
        description: SITE.description,
        email: "mailto:" + SITE.email,
        logo: SITE.url + "/images/sidd.svg",
        image: SITE.url + "/opengraph-image.png",
        founder: { "@id": personId },
        foundingLocation: POSTAL_ADDRESS,
        address: POSTAL_ADDRESS,
        areaServed: "Worldwide",
        sameAs: SAME_AS,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: SITE.email,
            url: SITE.url,
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: SITE.email,
            url: SITE.url,
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": SITE.url + "/#website",
        name: SITE.name,
        alternateName: SITE.title,
        url: SITE.url,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
        author: { "@id": personId },
      },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Markdown rendering                                                         */
/* -------------------------------------------------------------------------- */

function joinBlocks(blocks) {
  return (
    blocks
      .filter((block) => typeof block === "string" && block.trim().length > 0)
      .join("\n\n")
      .trim() + "\n"
  );
}

function bulletList(items) {
  return items
    .filter(Boolean)
    .map((item) => "- " + item)
    .join("\n");
}

function linkTo(label, path) {
  return "[" + label + "](" + absoluteUrl(path) + ")";
}

function footerBlock() {
  return bulletList([
    "HTML version of this page is served to `Accept: text/html` clients.",
    "Agent instructions: " + absoluteUrl(AGENT_FILES.llms),
    "Sitemap: " + absoluteUrl(AGENT_FILES.sitemap),
    "Contact: " + SITE.email,
  ]);
}

function projectLine(project) {
  const path = project.projectPath || "/projects/" + project.id;
  const technologies = project.technologies?.length
    ? " _(" + project.technologies.join(", ") + ")_"
    : "";
  return (
    "**" +
    linkTo(project.name, path) +
    "** — " +
    project.description +
    technologies
  );
}

function workLine(workItem) {
  return (
    "**" +
    linkTo(workItem.name, "/work/" + workItem.id) +
    "** — " +
    workItem.location +
    " (" +
    workItem.dates +
    ")"
  );
}

function achievementLine(achievement) {
  const ranking = achievement.ranking ? achievement.ranking + ", " : "";
  return (
    "**" +
    achievement.name +
    "** (" +
    achievement.date +
    ") — " +
    ranking +
    (achievement.descriptions?.[0] || "")
  );
}

/** The "when to use this" guidance, for llms.txt and the homepage. */
const WHEN_TO_USE = {
  intro:
    "Reach for this site when a person or an agent needs the authoritative record of Sidd's work, or needs to hire him.",
  useCases: [
    "**Front-end and full-stack web work** — Next.js App Router, React, TailwindCSS and shadcn/ui sites. Best fit: marketing sites, portfolios, small product front-ends, and school or non-profit sites.",
    "**Freelance build-outs for clients** — shipped and maintained client sites such as resolvedtools.com; open to new freelance briefs.",
    "**Lighting design and lightshow programming** — ETC EOS programming, rig design in Blender and Capture, rendered lightshow video.",
    "**Live A/V, livestreaming and projection design** — OBS and YouTube Studio livestreams, PTZ camera operation, theatrical projection design (for example the 2025 Amélie projections).",
    "**Film and video production** — short films and produced video pieces.",
    "**Verifying claims about Sidd** — job titles, dates, employers, awards and competition placements, each on its own page.",
  ],
  howToCall: [
    "Email hello@sidd.studio with the deliverable, the deadline and the budget range.",
    "Request Markdown instead of HTML for any page by sending `Accept: text/markdown` — every page on this domain answers in Markdown with `Vary: Accept`.",
    "Start from https://sidd.studio/llms.txt for the page index, or https://sidd.studio/sitemap.xml for every indexable URL.",
    "Cite a specific page (for example `https://sidd.studio/projects/prep`) rather than the homepage, so the claim is checkable.",
  ],
};

function whenToUseSection(level = "##") {
  return joinBlocks([
    level + " When to use this site",
    WHEN_TO_USE.intro,
    bulletList(WHEN_TO_USE.useCases),
    level + "# How an agent should reach Sidd",
    bulletList(WHEN_TO_USE.howToCall),
  ]).trimEnd();
}

const STATIC_PAGES = [
  {
    path: "/",
    label: "Home",
    note: "Featured projects, work history and awards.",
  },
  {
    path: "/about",
    label: "About me",
    note: "Who Sidd is, told as a scroll-through story.",
  },
  {
    path: "/coding",
    label: "Coding",
    note: "Coding history, current stack and coding projects.",
  },
  {
    path: "/design",
    label: "Design",
    note: "Design work and design-led projects.",
  },
  {
    path: "/lightshows",
    label: "Lightshows",
    note: "Rendered lightshows and how they are produced.",
  },
  {
    path: "/projects",
    label: "Projects",
    note: "Every project, filterable by type and technology.",
  },
  {
    path: "/work",
    label: "Work",
    note: "Internships, research and freelance roles.",
  },
];

function pageIndexBlock() {
  return bulletList(
    STATIC_PAGES.map(
      (page) => linkTo(page.label, page.path) + ": " + page.note,
    ),
  );
}

function homeMarkdown(data) {
  return joinBlocks([
    "# " + SITE.title,
    SITE.description,
    "## Projects",
    "Things Sidd has worked on.",
    bulletList(data.projects.map(projectLine)),
    "## Work",
    "Where Sidd has worked.",
    bulletList(data.work.map(workLine)),
    "## Awards and achievements",
    bulletList(data.achievements.map(achievementLine)),
    "## Pages on this site",
    pageIndexBlock(),
    whenToUseSection(),
    "## Elsewhere",
    bulletList([
      "GitHub: " + SITE.github,
      "YouTube: " + SITE.youtube,
      "Email: " + SITE.email,
      "Based in: " + SITE.city + ", " + SITE.regionName + ", USA",
    ]),
    "---",
    footerBlock(),
  ]);
}

function aboutMarkdown(data) {
  return joinBlocks([
    "# About Sidd",
    SITE.description,
    "Sidd started coding in 2019 with JavaScript and Discord bots, moved into web development to build dashboards and landing pages for them, and now builds with Next.js, React and TailwindCSS. He also designs lightshows, produces films, and runs live A/V and livestreams. He works remotely from " +
      SITE.city +
      ", " +
      SITE.regionName +
      ", while attending high school.",
    "## Work history",
    bulletList(data.work.map(workLine)),
    "## Awards and achievements",
    bulletList(data.achievements.map(achievementLine)),
    "## Contact",
    bulletList([
      "Email: " + SITE.email,
      "GitHub: " + SITE.github,
      "YouTube: " + SITE.youtube,
    ]),
    "---",
    footerBlock(),
  ]);
}

function listMarkdown({ title, intro, body, extra }) {
  return joinBlocks([
    "# " + title,
    intro,
    body,
    extra,
    "## Pages on this site",
    pageIndexBlock(),
    "---",
    footerBlock(),
  ]);
}

function projectMarkdown(project) {
  const path = project.projectPath || "/projects/" + project.id;

  return joinBlocks([
    "# " + project.name,
    project.description,
    "## Details",
    bulletList([
      "Page: " + absoluteUrl(path),
      project.url ? "Live project: " + project.url : null,
      project.type?.length ? "Type: " + project.type.join(", ") : null,
      project.technologies?.length
        ? "Built with: " + project.technologies.join(", ")
        : null,
      "By: " + SITE.name + " (" + SITE.url + ")",
    ]),
    "The full write-up, including screenshots, lives on the HTML page above.",
    "---",
    footerBlock(),
  ]);
}

function workMarkdown(workItem) {
  return joinBlocks([
    "# " + workItem.name,
    workItem.location + " · " + workItem.dates,
    workItem.details?.length ? "## What the role involved" : null,
    workItem.details?.length ? bulletList(workItem.details) : null,
    "## Details",
    bulletList([
      "Page: " + absoluteUrl("/work/" + workItem.id),
      workItem.type?.length ? "Type: " + workItem.type.join(", ") : null,
      "Held by: " + SITE.name + " (" + SITE.url + ")",
    ]),
    "---",
    footerBlock(),
  ]);
}

/**
 * Renders the Markdown representation of a path.
 * Returns `{ status, body }`; unknown paths get a 404 with a Markdown body.
 */
export function renderMarkdown(rawPath, data) {
  const path = normalizePath(rawPath);
  const projects = data?.projects ?? [];
  const work = data?.work ?? [];
  const achievements = data?.achievements ?? [];
  const lightshows = data?.lightshows ?? [];

  const ok = (body) => ({ status: 200, body });

  switch (path) {
    case "/":
      return ok(homeMarkdown({ projects, work, achievements }));
    case "/about":
      return ok(aboutMarkdown({ work, achievements }));
    case "/projects":
      return ok(
        listMarkdown({
          title: "Projects",
          intro:
            "Everything " +
            SITE.name +
            " has built or designed. The HTML page lets you filter by type and technology.",
          body: bulletList(projects.map(projectLine)),
        }),
      );
    case "/work":
      return ok(
        listMarkdown({
          title: "Work",
          intro:
            "Internships, research roles, freelance and volunteer work held by " +
            SITE.name +
            ".",
          body: bulletList(work.map(workLine)),
        }),
      );
    case "/coding":
      return ok(
        listMarkdown({
          title: "Coding",
          intro:
            "Sidd has been coding since 2019. He started in JavaScript building Discord bots, moved into web development, and now ships with Next.js, React, TailwindCSS, shadcn/ui and Vercel.",
          body: bulletList(
            projects
              .filter((project) => project.type?.includes("coding"))
              .map(projectLine),
          ),
          extra: joinBlocks([
            "## Current stack",
            bulletList([
              "Frameworks: React, Next.js",
              "Styling: TailwindCSS",
              "Tooling: shadcn/ui, Figma",
              "Deployment: Vercel",
              "Languages: JavaScript",
            ]),
          ]).trimEnd(),
        }),
      );
    case "/design":
      return ok(
        listMarkdown({
          title: "Design",
          intro:
            "Sidd's design work: UI and UX for the web, plus design-led projects where the look is the point.",
          body: bulletList(
            projects
              .filter(
                (project) =>
                  project.type?.includes("design") ||
                  project.type?.includes("website"),
              )
              .map(projectLine),
          ),
        }),
      );
    case "/lightshows":
      return ok(
        listMarkdown({
          title: "Lightshows",
          intro:
            "Sidd designs and programs lightshows, then renders them to video. Rigs are modelled in Blender, installed in Capture Student Edition, and programmed in ETC's EOS software; the DMX output travels over sACN into Capture, which records the render.",
          body: lightshows.length
            ? bulletList(
                lightshows.map(
                  (show) =>
                    "**" +
                    show.title +
                    "** — https://www.youtube.com/watch?v=" +
                    show.id,
                ),
              )
            : "The rendered shows are embedded on the HTML page: " +
              absoluteUrl("/lightshows"),
        }),
      );
    default:
      break;
  }

  const projectMatch = /^\/projects\/([^/]+)$/.exec(path);
  if (projectMatch) {
    const project = projects.find((item) => item.id === projectMatch[1]);
    if (project) return ok(projectMarkdown(project));
  }

  const workMatch = /^\/work\/([^/]+)$/.exec(path);
  if (workMatch) {
    const workItem = work.find((item) => item.id === workMatch[1]);
    if (workItem) return ok(workMarkdown(workItem));
  }

  return { status: 404, body: renderNotFoundMarkdown(path) };
}

/**
 * The Markdown body served for a 404. Explains the error and points at the
 * machine-readable indexes so an agent can recover without guessing.
 */
export function renderNotFoundMarkdown(rawPath) {
  const path = normalizePath(rawPath);

  return joinBlocks([
    "# 404 — Page not found",
    "There is no page at `" +
      path +
      "` on " +
      SITE.url +
      ". The URL may be mistyped, or the page may have been renamed or removed. Nothing was served for it, and no redirect applies.",
    "## Where to go instead",
    bulletList([
      "Agent instructions and page index: " + absoluteUrl(AGENT_FILES.llms),
      "Sitemap of every indexable URL: " + absoluteUrl(AGENT_FILES.sitemap),
      "Homepage: " + SITE.url,
    ]),
    "## Pages that do exist",
    pageIndexBlock(),
    "## Still stuck?",
    "Email " + SITE.email + " with the URL you expected to work.",
  ]);
}

/**
 * The llms.txt body, following the llms.txt convention: one H1, a blockquote
 * summary, then H2 sections of Markdown links.
 */
export function renderLlmsTxt(data) {
  const projects = data?.projects ?? [];
  const work = data?.work ?? [];
  const achievements = data?.achievements ?? [];

  return joinBlocks([
    "# " + SITE.title,
    "> " + SITE.description,
    "Every page on this domain also answers in Markdown. Send `Accept: text/markdown` to any URL and you get Markdown with `Vary: Accept`; send `Accept: text/html` and you get the normal page. Appending `.md` to a path works too.",
    whenToUseSection(),
    "## Pages",
    pageIndexBlock(),
    "## Projects",
    bulletList(projects.map(projectLine)),
    "## Work",
    bulletList(work.map(workLine)),
    "## Awards and achievements",
    bulletList(achievements.map(achievementLine)),
    "## Machine-readable files",
    bulletList([
      linkTo("llms.txt", AGENT_FILES.llms) + ": this file.",
      linkTo("sitemap.xml", AGENT_FILES.sitemap) + ": every indexable URL.",
      linkTo("robots.txt", AGENT_FILES.robots) +
        ": crawl rules and sitemap pointer.",
      linkTo("manifest.webmanifest", "/manifest.webmanifest") +
        ": web app manifest.",
      "JSON-LD: a schema.org `@graph` with `Person`, `Organization` and `WebSite` is embedded in every page's HTML.",
    ]),
    "## Contact",
    bulletList([
      "Email: " + SITE.email,
      "GitHub: " + SITE.github,
      "YouTube: " + SITE.youtube,
      "Location: " +
        SITE.city +
        ", " +
        SITE.regionName +
        ", USA (remote worldwide)",
    ]),
  ]);
}
