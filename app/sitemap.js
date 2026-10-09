import { projects } from "@/lib/projects";
import { work } from "@/lib/work";

const BASE_URL = "https://sidd.studio";

export default function sitemap() {
  const lastModified = new Date();

  const pages = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/coding", changeFrequency: "monthly", priority: 0.5 },
    { path: "/design", changeFrequency: "monthly", priority: 0.5 },
    { path: "/lightshows", changeFrequency: "monthly", priority: 0.5 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.5 },
    { path: "/work", changeFrequency: "monthly", priority: 0.5 },
    ...projects
      .filter((project) => !project.projectPath)
      .map((project) => ({
        path: "/projects/" + project.id,
        changeFrequency: "yearly",
        priority: 0.4,
      })),
    ...work.map((workItem) => ({
      path: "/work/" + workItem.id,
      changeFrequency: "yearly",
      priority: 0.4,
    })),
  ];

  return pages.map(({ path, ...rest }) => ({
    url: BASE_URL + path,
    lastModified,
    ...rest,
  }));
}
