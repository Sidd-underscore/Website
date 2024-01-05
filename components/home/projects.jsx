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

export function OpenNewTab() {
  return (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

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
      <h2 className="text-4xl font-semibold">Projects</h2>

      <div
        ref={projectsElement}
        id={"projects"}
        className="mt-12 grid w-full grid-flow-row gap-4 text-center lg:mb-0 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:text-left"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="project group relative rounded-lg transition-colors"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -right-2 -top-2 z-10 -m-1 h-0 w-0 overflow-hidden rounded-full p-0 text-zinc-950 transition-all duration-300 [clip:rect(0,0,0,0)] group-hover:h-auto group-hover:w-auto group-hover:p-2 group-hover:[clip:auto] dark:bg-zinc-200 dark:hover:bg-zinc-50"
            >
              <OpenNewTab />
            </a>
            <div className="project-content">
              <div className="flex h-full flex-col justify-between px-5 py-4">
                <div>
                  <p className="-ml-1 mb-3 font-mono text-xs">
                    {project.technologies.map((technology, index) => (
                      <span
                        className="mx-1 rounded-full bg-zinc-50 px-3 py-1 transition dark:bg-zinc-100/25"
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
            <Link
              className="absolute bottom-3 left-7 z-10 flex items-center border-b border-transparent text-sm transition-all hover:border-white/50 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="lol"
            >
              More about this project{" "}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
