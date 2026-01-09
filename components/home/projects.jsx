"use client";

import { Link } from "@/components/ui/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { cn, formatArrayIntoSentence } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerVerticalIcon, Cross2Icon } from "@radix-ui/react-icons";
import autoAnimate from "@formkit/auto-animate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Projects({
  className,
  defaultProjectTypes,
  defaultTechnologies,
}) {
  const parent = useRef(null);
  const filterRowRef = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  useEffect(() => {
    filterRowRef.current && autoAnimate(filterRowRef.current);
  }, []);

  function gatherAllProjectData() {
    const types = [];
    const technologies = [];

    projects.forEach((project) => {
      project.type.forEach((type) => {
        if (!types.includes(type)) types.push(type);
      });

      project.technologies?.forEach((tech) => {
        if (!technologies.includes(tech)) technologies.push(tech);
      });
    });

    return { types, technologies };
  }

  const projectData = gatherAllProjectData();

  const [projectTypesToShow, setProjectTypesToShow] = useState(
    defaultProjectTypes || projectData.types,
  );
  const [projectTechnologiesToShow, setProjectTechnologiesToShow] = useState(
    defaultTechnologies || projectData.technologies,
  );

  const [projectsToDisplay, setProjectsToDisplay] = useState([]);
  const [projectHovered, setProjectHovered] = useState(false);

  useEffect(() => {
    setProjectsToDisplay(
      projects.filter((project) => {
        const typeMatch = project.type.some((t) =>
          projectTypesToShow.includes(t),
        );
        const techMatch = project.technologies?.some((t) =>
          projectTechnologiesToShow.includes(t),
        );
        return typeMatch && techMatch;
      }),
    );
  }, [projectTypesToShow, projectTechnologiesToShow]);

  return (
    <div className={cn("my-32 w-full text-left", className)}>
      <div>
        <h2 className="text-4xl font-semibold">
          {formatArrayIntoSentence(
            defaultProjectTypes || [],
            undefined,
            undefined,
            true,
          )}{" "}
          Projects
        </h2>
        <p className="mt-1 text-sm">
          Here are some things that I have worked on.
        </p>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 space-x-2 px-4 py-2">
              <MixerVerticalIcon />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            {projectData.types.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                className="capitalize"
                onSelect={(e) => e.preventDefault()}
                checked={projectTypesToShow.includes(type)}
                onCheckedChange={(v) =>
                  v
                    ? setProjectTypesToShow([...projectTypesToShow, type])
                    : setProjectTypesToShow(
                        projectTypesToShow.filter((t) => t !== type),
                      )
                }
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Technologies</DropdownMenuLabel>
            {projectData.technologies.map((tech) => (
              <DropdownMenuCheckboxItem
                key={tech.name}
                onSelect={(e) => e.preventDefault()}
                checked={projectTechnologiesToShow.includes(tech)}
                onCheckedChange={(v) =>
                  v
                    ? setProjectTechnologiesToShow([
                        ...projectTechnologiesToShow,
                        tech,
                      ])
                    : setProjectTechnologiesToShow(
                        projectTechnologiesToShow.filter((t) => t !== tech),
                      )
                }
              >
                <span className="mr-2">{tech.icon}</span>
                {tech.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(projectTypesToShow.length < projectData.types.length ||
          projectTechnologiesToShow.length <
            projectData.technologies.length) && (
          <>
            <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

            {projectTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="h-8 rounded-full px-3 capitalize"
                onClick={() =>
                  setProjectTypesToShow(
                    projectTypesToShow.filter((t) => t !== type),
                  )
                }
              >
                {type}
                <Cross2Icon className="ml-1 size-3.5" />
              </Button>
            ))}

            {projectTechnologiesToShow.map((tech) => (
              <Button
                key={tech.name}
                variant="secondary"
                className="h-8 rounded-full px-3"
                onClick={() =>
                  setProjectTechnologiesToShow(
                    projectTechnologiesToShow.filter((t) => t !== tech),
                  )
                }
              >
                {tech.icon}
                <span className="ml-1">{tech.name}</span>
                <Cross2Icon className="ml-1 size-3.5" />
              </Button>
            ))}

            <Button
              variant="ghost"
              className="h-8 px-2 text-sm"
              onClick={() => {
                setProjectTypesToShow(projectData.types);
                setProjectTechnologiesToShow(projectData.technologies);
              }}
            >
              Clear all
            </Button>
          </>
        )}
      </div>

      <div
        ref={parent}
        className={`relative mt-12 w-full ${
          projectsToDisplay.length
            ? "grid grid-cols-1 gap-4 md:grid-cols-2"
            : ""
        }`}
      >
        {projectsToDisplay.length > 0 ? (
          projectsToDisplay.map((project, index) => (
            <Link
              href={
                project.projectPath
                  ? project.projectPath
                  : "/projects/" + project.id
              }
              key={project.name}
              className="text-inherit!"
            >
              <div
                onMouseEnter={() => setProjectHovered(project.name)}
                onMouseLeave={() => setProjectHovered(false)}
                className={`group relative flex h-64 flex-col rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-[height] duration-300 hover:h-82 md:hover:h-64 dark:border-neutral-700/50 dark:bg-neutral-800/50 ${projectHovered && projectHovered != project.name ? "opacity-50" : ""}`}
              >
                <div
                  className={cn(
                    "h-64 w-full rounded-md border border-transparent transition-[translate_width_height] duration-300 group-hover:h-82 group-hover:border-neutral-200 group-hover:bg-white group-hover:shadow-2xl md:group-hover:absolute md:group-hover:z-40 md:group-hover:-mt-9 md:group-hover:w-[115%] md:group-hover:scale-105 dark:group-hover:border-neutral-700 dark:group-hover:bg-neutral-900",

                    index % 2 === 0 ? "" : "md:group-hover:-translate-x-[15%]",
                  )}
                >
                  <div className="absolute h-full w-full rounded-md opacity-30 duration-300 group-hover:opacity-100 dark:opacity-50 dark:group-hover:opacity-50">
                    <svg className="h-full w-full rounded-md">
                      <filter id="noise-filter">
                        <feGaussianBlur stdDeviation="4" result="blur" />

                        <feColorMatrix
                          type="saturate"
                          values="1"
                          result="grain"
                        />
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.6"
                          numOctaves="1"
                        />

                        <feComposite operator="in" in2="blur" in="grain" />
                      </filter>

                      <foreignObject
                        width="100%"
                        height="100%"
                        x={0}
                        y={0}
                        filter="url(#noise-filter)"
                        className="z-1"
                      >
                        <Image
                          src={project.featuredImage.src}
                          className="rounded-md object-cover filter-[brightness(40%)] duration-300 dark:filter-[brightness(60%)]"
                          fill={true}
                          alt=""
                        />
                      </foreignObject>
                    </svg>
                  </div>
                  <div className="z-20 flex h-full w-full flex-col justify-between px-5 py-4 group-hover:text-white group-hover:drop-shadow-lg">
                    <div className="z-10">
                      <h3 className={`mb-3 text-2xl font-semibold`}>
                        {project.name}
                      </h3>

                      <p
                        className={`relative m-0 overflow-hidden text-sm text-ellipsis opacity-75 group-hover:text-base group-hover:opacity-100 group-hover:after:hidden dark:after:bg-[linear-gradient(90deg,rgba(23,23,23,0)0%,rgba(23,23,23,1)50%,rgba(23,23,23,1)100%)]`}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div className="absolute right-2 bottom-2 flex items-center -space-x-3 font-mono text-xs transition-[margin-inline-start_margin-inline-end] duration-300 group-hover:right-4 group-hover:bottom-4 group-hover:space-x-2">
                      {project.technologies?.map((technology) => (
                        <div key={technology.name} className="relative">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger
                                onClick={() => {
                                  setProjectTechnologiesToShow([technology]);
                                }}
                                className="text-md flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-neutral-200 p-0 group-hover:border-neutral-300/10 group-hover:bg-neutral-100/10 hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:group-hover:bg-neutral-800/75 dark:hover:border-neutral-600 dark:hover:bg-neutral-600/50"
                              >
                                <>
                                  {technology.icon}
                                  <span className="sr-only">
                                    Click to only show projects with{" "}
                                    {technology.name}
                                  </span>
                                </>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" sideOffset={16}>
                                Click to only show projects with{" "}
                                {technology.name}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="w-full text-center text-neutral-400">
            No projects found... Try{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                setProjectTypesToShow(gatherAllProjectData().types);
                setProjectTechnologiesToShow(
                  gatherAllProjectData().technologies,
                );
              }}
            >
              clearing the filters
            </span>
            ?
          </p>
        )}
      </div>
    </div>
  );
}
