"use client";

import { Link } from "@/components/ui/link";
import { useEffect, useState } from "react";
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
import { MixerVerticalIcon } from "@radix-ui/react-icons";

export function Projects({
  className,
  defaultProjectTypes,
  defaultTechnologies,
}) {
  function gatherAllProjectData() {
    const types = [];
    const technologies = [];

    projects.forEach((project) => {
      project.type.forEach((type) => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });

      project.technologies.forEach((technology) => {
        if (!technologies.includes(technology)) {
          technologies.push(technology);
        }
      });
    });
    return { types, technologies };
  }

  const [projectHovered, setProjectHovered] = useState(false);

  const [projectTypesToShow, setProjectTypesToShow] = useState(
    defaultProjectTypes || gatherAllProjectData().types,
  );
  const [projectTechnologiesToShow, setProjectTechnologiesToShow] = useState(
    defaultTechnologies || gatherAllProjectData().technologies,
  );

  const [projectsToDisplay, setProjectsToDisplay] = useState([]);

  useEffect(() => {
    let tempProjects = projects.filter((project) => {
      const anyTypeIncluded = project.type.some((type) =>
        projectTypesToShow.includes(type),
      );
      const anyTechnologyIncluded = project.technologies.some((tech) =>
        projectTechnologiesToShow.includes(tech),
      );

      return anyTypeIncluded && anyTechnologyIncluded;
    });

    setProjectsToDisplay(tempProjects);
  }, [projectTypesToShow, projectTechnologiesToShow]);

  return (
    <div className={cn("my-32 w-full text-left", className)}>
      <div className="flex items-end justify-between">
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
            Here are some things that I have coded
            {defaultProjectTypes
              ? " that are " +
                formatArrayIntoSentence(
                  defaultProjectTypes || [],
                  undefined,
                  ", or ",
                ) +
                " related"
              : null}
            {defaultTechnologies
              ? ` and use ${defaultTechnologies ? formatArrayIntoSentence(defaultTechnologies || [], undefined, ", or ") : null}`
              : null}
            ! All of them are open-source :)
          </p>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 w-9 space-x-2 p-0 md:w-auto md:px-4 md:py-2"
              >
                <MixerVerticalIcon />{" "}
                <span className="hidden md:block">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 capitalize">
              <DropdownMenuLabel>Types</DropdownMenuLabel>
              {gatherAllProjectData().types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={projectTypesToShow?.includes(type)}
                  onCheckedChange={(e) =>
                    e
                      ? setProjectTypesToShow([...projectTypesToShow, type])
                      : setProjectTypesToShow(
                          projectTypesToShow.filter((t) => t != type),
                        )
                  }
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Technologies</DropdownMenuLabel>
              {gatherAllProjectData().technologies.map((technology) => (
                <DropdownMenuCheckboxItem
                  key={technology}
                  checked={projectTechnologiesToShow?.includes(technology)}
                  onCheckedChange={(e) =>
                    e
                      ? setProjectTechnologiesToShow([
                          ...projectTechnologiesToShow,
                          technology,
                        ])
                      : setProjectTechnologiesToShow(
                          projectTechnologiesToShow.filter(
                            (t) => t != technology,
                          ),
                        )
                  }
                >
                  {technology}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className={`relative mt-12 grid w-full grid-flow-row grid-cols-1 gap-4 text-center md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3`}
      >
        {projectsToDisplay.map((project, index) => (
          <div
            onMouseEnter={() => setProjectHovered(project.name)}
            onMouseLeave={() => setProjectHovered(false)}
            key={project.name}
            className={`duration-400 group relative flex h-60 flex-col rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-all hover:h-[26rem] hover:!bg-transparent hover:before:bg-none hover:after:bg-none dark:border-neutral-700/50 dark:bg-neutral-800/50 lg:hover:h-60 ${index === 2 && projectHovered == project.name ? "xl:-ml-12" : ""} ${projectHovered && projectHovered != project.name ? "opacity-50" : ""}`}
          >
            <div className="h-64 rounded-md border border-transparent transition-all duration-200 group-hover:z-40 group-hover:h-[20rem] group-hover:border-neutral-200 group-hover:bg-white group-hover:shadow-2xl dark:group-hover:border-neutral-700 dark:group-hover:bg-neutral-900 lg:group-hover:absolute lg:group-hover:-ml-6 lg:group-hover:-mt-6 lg:group-hover:w-[32rem]">
              <div className="absolute h-full w-full rounded-md opacity-0 transition duration-200 group-hover:opacity-100">
                <svg className="h-full w-full rounded-md blur-[1px]">
                  <filter id="noise-filter">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.6"
                      numOctaves="1"
                    />

                    <feColorMatrix type="saturate" values="1" result="grain" />
                    <feComposite operator="in" in="blur" in2="grain" />
                  </filter>

                  <rect
                    width="100%"
                    height="100%"
                    className="rounded-md opacity-0 group-hover:opacity-75"
                    rx={6}
                  />

                  <foreignObject
                    width="100%"
                    height="100%"
                    x={0}
                    y={0}
                    filter="url(#noise-filter)"
                    className="z-[1]"
                  >
                    <Image
                      src={project.featuredImage.src}
                      className="rounded-md object-cover [filter:brightness(80%)]"
                      fill={true}
                      alt=""
                    />
                  </foreignObject>
                </svg>
              </div>
              <div className="z-20 flex h-full w-full flex-col justify-between px-5 py-4 group-hover:text-white group-hover:drop-shadow-lg">
                <div className="z-10">
                  <p className="-ml-1 mb-3 font-mono text-xs">
                    {project.technologies.map((technology) => (
                      <span
                        className="mx-1 rounded-full border border-neutral-300 bg-neutral-200 px-3 py-1 transition-none group-hover:border-neutral-200 group-hover:bg-neutral-200/75 group-hover:text-black dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-neutral-500/75 dark:group-hover:bg-neutral-700/50 dark:group-hover:text-white"
                        key={technology}
                      >
                        {technology}
                      </span>
                    ))}
                  </p>

                  <h3 className={`mb-3 text-2xl font-semibold`}>
                    {project.name}
                  </h3>

                  <p
                    className={`relative m-0 max-h-20 overflow-hidden text-ellipsis text-sm opacity-75 transition-all duration-200 group-hover:max-h-none group-hover:text-base group-hover:opacity-100 group-hover:after:hidden after:dark:bg-[linear-gradient(90deg,rgba(23,23,23,0)0%,rgba(23,23,23,1)50%,rgba(23,23,23,1)100%)]`}
                  >
                    {project.description}
                  </p>
                </div>
                <div className="mt-4 flex justify-center md:justify-start">
                  <Link
                    className="w-fit group-hover:border-pink-200 group-hover:text-pink-200 group-hover:hover:border-pink-300 group-hover:hover:text-pink-300"
                    href={"/projects/" + project.id}
                  >
                    More about this project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
