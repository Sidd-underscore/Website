"use client";

import { Link } from "@/components/ui/link";
import { work } from "@/lib/work";
import {
  SewingPinFilledIcon,
  CalendarIcon,
  MixerVerticalIcon,
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

export function Work({ className, defaultWorkTypes }) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
            {formatArrayIntoSentence(
              defaultWorkTypes || [],
              undefined,
              undefined,
              true,
            )}{" "}
            Work Experience
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
            ! My full CV can be found{" "}
            <Link
              className="!inline w-fit"
              target="_blank"
              href="https://docs.google.com/document/d/1pvQcjzzaIq11oYS_XvRQHYKZNvDmu8OxrgsjTjLtX4w/view"
            >
              here
            </Link>
            .
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
              {workData.types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
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
        </div>
      </div>
      <div
        ref={parent}
        className="mt-12 grid w-full grid-flow-row grid-cols-1 gap-4 text-center md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3"
      >
        {worksToDisplay.map((workItem) => (
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
                    <SewingPinFilledIcon className="h-4 w-4 shrink-0" />
                    <span>{workItem.location}</span>
                  </p>

                  <p
                    className={`m-0 flex items-center space-x-2 text-sm opacity-50`}
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span>{workItem.dates}</span>
                  </p>

                  <div className={`!m-4 text-sm`}>
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
                    className="w-fit group-hover:border-pink-200 group-hover:text-pink-200 group-hover:hover:border-pink-300 group-hover:hover:text-pink-300"
                    href={"/work/" + workItem.id}
                  >
                    Learn more
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
