"use client";

import { Link } from "@/components/ui/link";
import { work } from "@/lib/work";
import {
  SewingPinFilledIcon,
  CalendarIcon,
  MixerVerticalIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatArrayIntoSentence } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

export function Work({ className, defaultWorkTypes, title }) {
  const parent = useRef(null);
  const filterRowRef = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    filterRowRef.current && autoAnimate(filterRowRef.current);
  }, [filterRowRef]);

  function gatherAllWorkData() {
    const types = [];

    work.forEach((workItem) => {
      workItem.type.forEach((type) => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });
    });
    return { types };
  }

  const workData = gatherAllWorkData();

  const [workTypesToShow, setWorkTypesToShow] = useState(
    defaultWorkTypes || workData.types,
  );

  const [worksToDisplay, setWorksToDisplay] = useState([]);

  useEffect(() => {
    let tempWorks = work.filter((workItem) => {
      const anyTypeIncluded = workItem.type.some((type) =>
        workTypesToShow.includes(type),
      );
      return anyTypeIncluded;
    });

    setWorksToDisplay(tempWorks);
  }, [workTypesToShow]);

  return (
    <div className={cn("my-32 w-full text-left", className)}>
      <div className="flex items-end justify-between space-x-2">
        <div>
          <h2 className="text-4xl font-semibold">
            {title
              ? title
              : formatArrayIntoSentence(
                  defaultWorkTypes || [],
                  undefined,
                  undefined,
                  true,
                ) + "Work Experience"}
          </h2>
          <p className="mt-1 text-sm">
            The best testament of knowledge is putting it in practice. Here is
            some of my work experience
            {defaultWorkTypes
              ? "that are " +
                formatArrayIntoSentence(
                  defaultWorkTypes || [],
                  undefined,
                  ", or ",
                ) +
                " related"
              : null}
            ! My full resume can be found{" "}
            <Link
              className="inline! w-fit"
              target="_blank"
              href="https://docs.google.com/document/u/1/d/e/2PACX-1vQXvkuGlTvrrmcohbt0IMEwqICI7LXFGADMdX1dmSIJqNIKYZjiAamP3D5tZEEXJYuOZX0zUMpmSXoZ/pub"
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 space-x-2 px-4 py-2">
              <MixerVerticalIcon /> <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 capitalize">
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            {workData.types.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                onSelect={(event) => event.preventDefault()}
                checked={workTypesToShow?.includes(type)}
                onCheckedChange={(e) =>
                  e
                    ? setWorkTypesToShow([...workTypesToShow, type])
                    : setWorkTypesToShow(
                        workTypesToShow.filter((t) => t != type),
                      )
                }
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Active filter chips */}
        {workTypesToShow.length < workData.types.length && (
          <>
            <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
            {workTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="h-8 gap-1.5 rounded-full px-3 py-1 text-sm capitalize"
                onClick={() =>
                  setWorkTypesToShow(workTypesToShow.filter((t) => t !== type))
                }
              >
                {type}
                <Cross2Icon className="size-3.5" />
              </Button>
            ))}
            {workTypesToShow.length > 0 && (
              <Button
                variant="ghost"
                className="h-8 px-2 text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                onClick={() => setWorkTypesToShow(workData.types)}
              >
                Clear all
              </Button>
            )}
          </>
        )}
      </div>
      <div
        ref={parent}
        className={`relative mt-12 w-full ${worksToDisplay.length > 0 ? "grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2" : ""} text-center md:text-left lg:mb-0`}
      >
        {worksToDisplay.length > 0 ? (
          worksToDisplay.map((workItem) => (
            <div
              key={workItem.name}
              className="group relative h-full rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-colors dark:border-neutral-700/50 dark:bg-neutral-800/50"
            >
              <div className="h-full">
                <div className="z-30 flex h-full flex-col justify-between px-5 py-4 text-left">
                  <div className="space-y-1">
                    <h3 className={`mb-3 text-2xl font-semibold`}>
                      {workItem.name}
                    </h3>
                    <p
                      className={`m-0 flex items-center space-x-2 text-sm opacity-50`}
                    >
                      <SewingPinFilledIcon className="size-4 shrink-0" />
                      <span>{workItem.location}</span>
                    </p>

                    <p
                      className={`m-0 flex items-center space-x-2 text-sm opacity-50`}
                    >
                      <CalendarIcon className="size-4 shrink-0" />
                      <span>{workItem.dates}</span>
                    </p>

                    <div className={`m-4! text-sm`}>
                      <ul className="list-disc text-left">
                        {workItem.details.map((item) => (
                          <li className="opacity-75" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center md:justify-start">
                    <Link
                      className="w-fit group-hover:border-pink-200 group-hover:text-pink-200 hover:group-hover:border-pink-300 hover:group-hover:text-pink-300"
                      href={"/work/" + workItem.id}
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center text-neutral-400">
            No relevant work items found... Try{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                setWorkTypesToShow(gatherAllWorkData().types);
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
