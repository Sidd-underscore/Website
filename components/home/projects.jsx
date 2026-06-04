"use client";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Settings2, X } from "lucide-react";
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

  function isTechnologySelected(selectedTechnologies, technology) {
    return selectedTechnologies.some(
      (selectedTechnology) => selectedTechnology.name === technology.name,
    );
  }

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

  const [projectHovered, setProjectHovered] = useState(false);

  const projectsToDisplay = useMemo(
    () =>
      projects.filter((project) => {
        const typeMatch = project.type.some((t) =>
          projectTypesToShow.includes(t),
        );
        const techMatch = project.technologies?.some((t) =>
          isTechnologySelected(projectTechnologiesToShow, t),
        );
        return typeMatch && techMatch;
      }),
    [projectTypesToShow, projectTechnologiesToShow],
  );

  const projectHeadingPrefix = formatArrayIntoSentence(
    defaultProjectTypes || [],
    undefined,
    undefined,
    true,
  );
  const projectHeading = `${projectHeadingPrefix ? projectHeadingPrefix + " " : ""}Projects`;

  return (
    <section className={cn("my-32 w-full text-left", className)}>
      <div>
        <div className="flex w-fit items-center gap-3 border-2 border-black bg-[#22FF00] px-3 py-2 text-black shadow-[5px_5px_0_#000]">
          <Icon name="StarGroup3_2" size="lg" />
          <h2 className="text-3xl leading-none font-black tracking-normal uppercase">
            {projectHeading}
          </h2>
        </div>

        <div className="mt-4 flex items-start justify-between space-x-2">
          <p className="w-full max-w-2xl border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black shadow-[4px_4px_0_#000]">
            Here are some things that I have worked on.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-2 md:px-4 py-2">
                <>
                  <Settings2 className="size-4" />
                  <span className="hidden md:block">Filter</span>
                </>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Types</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {projectData.types.map((type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        className="capitalize"
                        onSelect={(e) => e.preventDefault()}
                        checked={projectTypesToShow.includes(type)}
                        onCheckedChange={(v) =>
                          v
                            ? setProjectTypesToShow([
                                ...projectTypesToShow,
                                type,
                              ])
                            : setProjectTypesToShow(
                                projectTypesToShow.filter((t) => t !== type),
                              )
                        }
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Technologies</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {projectData.technologies.map((tech) => (
                      <DropdownMenuCheckboxItem
                        key={tech.name}
                        onSelect={(e) => e.preventDefault()}
                        checked={isTechnologySelected(
                          projectTechnologiesToShow,
                          tech,
                        )}
                        onCheckedChange={(v) =>
                          v
                            ? setProjectTechnologiesToShow([
                                ...projectTechnologiesToShow,
                                tech,
                              ])
                            : setProjectTechnologiesToShow(
                                projectTechnologiesToShow.filter(
                                  (selectedTechnology) =>
                                    selectedTechnology.name !== tech.name,
                                ),
                              )
                        }
                      >
                        <span className="mr-2">{tech.icon}</span>
                        {tech.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        {(projectTypesToShow.length < projectData.types.length ||
          projectTechnologiesToShow.length <
            projectData.technologies.length) && (
          <>
            {projectTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="px-3 text-xs uppercase"
                onClick={() =>
                  setProjectTypesToShow(
                    projectTypesToShow.filter((t) => t !== type),
                  )
                }
              >
                <>
                  {type}
                  <X className="ml-1 size-3" />
                </>
              </Button>
            ))}

            {projectTechnologiesToShow.map((tech) => (
              <Button
                key={tech.name}
                variant="secondary"
                className="px-3 text-xs uppercase"
                onClick={() =>
                  setProjectTechnologiesToShow(
                    projectTechnologiesToShow.filter(
                      (selectedTechnology) =>
                        selectedTechnology.name !== tech.name,
                    ),
                  )
                }
              >
                <>
                  {tech.icon}
                  <span className="ml-1">{tech.name}</span>
                  <X className="ml-1 size-3.5" />
                </>
              </Button>
            ))}

            <Button
              variant="destructive"
              size="icon"
              className="px-2 text-sm"
              onClick={() => {
                setProjectTypesToShow(projectData.types);
                setProjectTechnologiesToShow(projectData.technologies);
              }}
            >
              <X />
            </Button>
          </>
        )}
      </div>

      <div
        ref={parent}
        className={`relative mt-12 w-full ${
          projectsToDisplay.length
            ? "grid grid-cols-1 gap-6 md:grid-cols-2"
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
              className="text-inherit! no-underline hover:bg-transparent hover:text-inherit"
            >
              <div
                onMouseEnter={() => setProjectHovered(project.name)}
                onMouseLeave={() => setProjectHovered(false)}
                className={`y2k-card group relative flex h-64 flex-col ${projectHovered && projectHovered != project.name ? "opacity-50 transition-opacity duration-300" : ""}`}
              >
                <div
                  className={cn(
                    "h-64 w-full border-0 transition-[translate_width_height] duration-300 group-hover:h-82 group-hover:bg-black group-hover:text-white group-hover:shadow-[8px_8px_0_#000] md:group-hover:absolute md:group-hover:z-40 md:group-hover:-mt-9 md:group-hover:w-[115%] md:group-hover:scale-105",

                    index % 2 === 0 ? "" : "md:group-hover:-translate-x-[15%]",
                  )}
                >
                  <div className="absolute h-full w-full opacity-30 duration-300 group-hover:opacity-100">
                    <Image
                      src={project.featuredImage.src}
                      className="h-full w-full object-cover filter-[brightness(35%)]"
                      fill={true}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      alt=""
                    />
                  </div>
                  <div className="z-20 flex h-full w-full flex-col justify-between px-5 py-4 group-hover:text-white group-hover:drop-shadow-lg">
                    <div className="z-10">
                      <div className="mb-3 flex items-start gap-2">
                        <Icon
                          name="Sun"
                          size="default"
                          className="mt-1 group-hover:invert"
                        />
                        <h3 className="text-2xl font-black tracking-normal uppercase">
                          {project.name}
                        </h3>
                      </div>

                      <p className="relative m-0 overflow-hidden text-sm font-bold text-ellipsis opacity-80 group-hover:text-base group-hover:opacity-100 group-hover:after:hidden">
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
                                className="text-md flex size-8 cursor-pointer items-center justify-center overflow-hidden border-2 border-black bg-[#FFE121] p-0 text-black shadow-[2px_2px_0_#000] group-hover:bg-[#22FF00] hover:bg-[#FF80F2]"
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
    </section>
  );
}
