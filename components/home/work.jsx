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
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Work Experience</h2>
      <p className="text-sm mt-1">
        Outside of coding, I do many other things! Here are some examples. My
        full CV can be found{" "}
        <Link
          className="w-fit inline"
          target="_blank"
          href="https://docs.google.com/document/d/1pvQcjzzaIq11oYS_XvRQHYKZNvDmu8OxrgsjTjLtX4w/edit"
        >
          here
        </Link>
        .
      </p>

      <div
        ref={worksElement}
        id={"projects"}
        className="mt-12 grid w-full grid-flow-row grid-cols-1 gap-14 text-center md:gap-4 md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3"
      >
        {work.map((workItem) => (
          <div
            key={workItem.name}
            className="project group relative rounded-lg transition-colors"
          >
            <div className="project-content">
              <div className="flex h-full flex-col justify-between px-5 py-4">
                <div>
                  <h3 className={`mb-3 text-2xl font-semibold`}>
                    {workItem.name}
                  </h3>
                  <p
                    className={`m-0 text-sm opacity-50 flex items-start space-x-2`}
                  >
                    <SewingPinFilledIcon className="shrink-0 h-4 w-4" />
                    <span>{workItem.location}</span>
                  </p>

                  <p
                    className={`m-0 text-sm opacity-50 flex items-start space-x-2`}
                  >
                    <CalendarIcon className="shrink-0 h-4 w-4" />
                    <span>{workItem.dates}</span>
                  </p>

                  <p className={`m-4 text-sm opacity-75`}>
                    <ul className="list-disc">
                      {workItem.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}