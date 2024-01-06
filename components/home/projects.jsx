"use client";

import { Link } from "@/components/ui/link";
import { useEffect, useRef } from "react";

const projects = [
  {
    name: "PurAI's Website",
    description:
      "I designed and coded the documentation and showcase of PurAI, a project focused on providing high-quality AI for free.",
    technologies: ["Nextra", "TailwindCSS", "Nextjs"],
    url: "https://purai.purlabs.xyz",
  },
  {
    name: "Mastodon Template",
    description:
      "Through a Replit Bounty, I created a one-click runable instance of Mastodon, a free and open-source Twitter alternative. It is hosted on Replit, but the code works everywhere. In-depth documentation on everything from localhosting to the folder/file explanation (and more!) is also provided!",
    technologies: ["Ruby", "Bash Scripts"],
    url: "https://replit.com/@cool-sidd/Mastodon?v=1",
  },
  {
    name: "Mythos' Website",
    description:
      "As part of a Replit Bounty, I brought the amazing Discord bot Mythos to life with a website, complete with a dashboard, stats, and even an API. ",
    technologies: ["Nextjs", "shadcn/ui", "TailwindCSS"],
    url: "https://mythosbot.com",
  },
];

export function Projects() {
  const projectsElement = useRef(null);

  useEffect(() => {
    projectsElement.current.onmousemove = (e) => {
      for (const card of document.getElementsByClassName("project")) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  });

  return (
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Coding Projects</h2>

      <div
        ref={projectsElement}
        id={"projects"}
        className="mt-12 grid w-full grid-flow-row grid-cols-1 gap-4 text-center md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="project group relative rounded-lg transition-colors"
          >
            <div className="project-content">
              <div className="flex h-full flex-col justify-between px-5 py-4">
                <div>
                  <p className="-ml-1 mb-3 font-mono text-xs">
                    {project.technologies.map((technology, index) => (
                      <span
                        className="mx-1 rounded-full bg-zinc-50 px-3 py-1 transition dark:bg-zinc-700/50"
                        key={index}
                      >
                        {technology}
                      </span>
                    ))}
                  </p>
                  <h3 className={`mb-3 text-2xl font-semibold`}>
                    {project.name}
                  </h3>
                  <p className={`m-0 text-sm opacity-50`}>
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
            <Link className="absolute bottom-5 left-7 z-10 " href="lol">More about this project </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
