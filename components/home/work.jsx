"use client";

import { Link } from "@/components/ui/link";
import { useEffect, useRef } from "react";
import { work } from "@/lib/work";
import { SewingPinFilledIcon, CalendarIcon } from "@radix-ui/react-icons";

export function Work() {
  const worksElement = useRef(null);

  useEffect(() => {
    worksElement.current.onmousemove = (e) => {
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
    <div ref={worksElement} className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Work Experience</h2>
      <p className="mt-1 text-sm">
        The best testament of knowledge is putting it in practice. My
        full CV can be found{" "}
        <Link
          className="!inline w-fit"
          target="_blank"
          href="https://docs.google.com/document/d/1pvQcjzzaIq11oYS_XvRQHYKZNvDmu8OxrgsjTjLtX4w/view"
        >
          here
        </Link>
        .
      </p>

      <div className="projects mt-12 grid w-full grid-flow-row grid-cols-1 gap-14 text-center md:gap-4 md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3">
        {work.map((workItem) => (
          <div
            key={workItem.name}
            className="project group relative h-full rounded-lg transition-colors"
          >
            <div className="project-content h-full">
              <div className="flex z-30 h-full flex-col justify-between px-5 py-4 text-left">
                <div>
                  <h3 className={`mb-3 text-2xl font-semibold`}>
                    {workItem.name}
                  </h3>
                  <p
                    className={`m-0 flex items-start space-x-2 text-sm opacity-50`}
                  >
                    <SewingPinFilledIcon className="h-4 w-4 shrink-0" />
                    <span>{workItem.location}</span>
                  </p>

                  <p
                    className={`m-0 flex items-start space-x-2 text-sm opacity-50`}
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span>{workItem.dates}</span>
                  </p>

                  <div className={`m-4 text-sm`}>
                    <ul className="list-disc text-left">
                      {workItem.details.map((item) => (
                        <li className="opacity-75" key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
