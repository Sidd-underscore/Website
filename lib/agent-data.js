import { achievements } from "@/lib/achievements";
import { projects } from "@/lib/projects";
import { work } from "@/lib/work";

/**
 * Flattens the site's content modules into plain, serialisable data.
 *
 * The content modules carry JSX (long descriptions, technology icons) and
 * imported images, none of which can be rendered into Markdown, so everything
 * crosses into `lib/agent-content.mjs` through this adapter instead.
 */
export function getAgentData() {
  return {
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      url: project.url || null,
      projectPath: project.projectPath || null,
      type: project.type ?? [],
      technologies: (project.technologies ?? []).map((tech) => tech.name),
    })),
    work: work.map((workItem) => ({
      id: workItem.id,
      name: workItem.name,
      location: workItem.location,
      dates: workItem.dates,
      type: workItem.type ?? [],
      details: workItem.details ?? [],
    })),
    achievements: achievements.map((achievement) => ({
      id: achievement.id,
      name: achievement.name,
      date: achievement.date,
      category: achievement.category,
      ranking: achievement.ranking || null,
      descriptions: achievement.descriptions ?? [],
      type: achievement.type ?? [],
    })),
  };
}
