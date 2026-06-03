"use client";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { work } from "@/lib/work";
import { Pin, CalendarClock, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatArrayIntoSentence } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const worksToDisplay = useMemo(
    () =>
      work.filter((workItem) => {
        const anyTypeIncluded = workItem.type.some((type) =>
          workTypesToShow.includes(type),
        );
        return anyTypeIncluded;
      }),
    [workTypesToShow],
  );

  const workHeadingPrefix = formatArrayIntoSentence(
    defaultWorkTypes || [],
    undefined,
    undefined,
    true,
  );
  const workHeading =
    title ||
    `${workHeadingPrefix ? workHeadingPrefix + " " : ""}Work Experience`;

  return (
    <section className={cn("my-32 w-full text-left", className)}>
      <div className="flex items-end justify-between gap-2 w-full">
        <div className="w-full">
          <div className="flex w-fit items-center gap-3 border-2 border-black bg-[#FF80F2] px-3 py-2 text-black shadow-[5px_5px_0_#000]">
            <Icon name="StarGroup2" size="lg" />
            <h2 className="text-3xl leading-none font-black tracking-normal uppercase">
              {workHeading}
            </h2>
          </div>
          <div className="mt-4 flex items-start justify-between">
            <p className="max-w-2xl border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black shadow-[4px_4px_0_#000]">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 px-4 py-2">
                  <Settings2 className="size-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56 capitalize">
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
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        {/* Active filter chips */}
        {workTypesToShow.length < workData.types.length && (
          <>
            {workTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="gap-1.5 px-3 py-1 text-sm capitalize"
                onClick={() =>
                  setWorkTypesToShow(workTypesToShow.filter((t) => t !== type))
                }
              >
                {type}
                <X className="size-3.5" />
              </Button>
            ))}
            {workTypesToShow.length > 0 && (
              <Button
                variant="destructive"
                size="icon"
                className="px-2 text-sm"
                onClick={() => setWorkTypesToShow(workData.types)}
              >
                <X />
              </Button>
            )}
          </>
        )}
      </div>
      <div
        ref={parent}
        className={`relative mt-12 w-full ${worksToDisplay.length > 0 ? "grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-2" : ""} text-center md:text-left lg:mb-0`}
      >
        {worksToDisplay.length > 0 ? (
          worksToDisplay.map((workItem) => (
            <div
              key={workItem.name}
              className="y2k-card group relative h-full overflow-hidden transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-[10px_10px_0_#000]"
            >
              <Icon
                name="Globe"
                className="absolute top-3 right-3 opacity-20 transition group-hover:opacity-60"
              />
              <div className="h-full">
                <div className="z-30 flex h-full flex-col justify-between px-5 py-4 text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="mb-3 pr-12 text-2xl font-black tracking-normal uppercase">
                      {workItem.name}
                    </h3>
                    <p className="m-0 flex items-center gap-2 border-l-4 border-[#22FF00] pl-2 text-sm font-bold opacity-80">
                      <Pin className="size-4 shrink-0" />
                      <span>{workItem.location}</span>
                    </p>

                    <p className="m-0 flex items-center gap-2 border-l-4 border-[#FFE121] pl-2 text-sm font-bold opacity-80">
                      <CalendarClock className="size-4 shrink-0" />
                      <span>{workItem.dates}</span>
                    </p>

                    <div className="m-4! text-sm font-medium">
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
                      className="w-fit border-2 border-black bg-[#FFE121] px-3 py-2 text-black no-underline shadow-[4px_4px_0_#000] group-hover:bg-[#22FF00]"
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
    </section>
  );
}
