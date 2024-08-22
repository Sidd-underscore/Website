"use client";

import { Link } from "@/components/ui/link";
import { work } from "@/lib/work";
import { SewingPinFilledIcon, CalendarIcon } from "@radix-ui/react-icons";

export function Work() {
  return (
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Work Experience</h2>
      <p className="mt-1 text-sm">
        The best testament of knowledge is putting it in practice. My full CV
        can be found{" "}
        <Link
          className="!inline w-fit"
          target="_blank"
          href="https://docs.google.com/document/d/1pvQcjzzaIq11oYS_XvRQHYKZNvDmu8OxrgsjTjLtX4w/view"
        >
          here
        </Link>
        .
      </p>

      <div className="mt-12 grid w-full grid-flow-row grid-cols-1 text-center gap-4 md:text-left lg:mb-0 lg:grid-cols-2 xl:grid-cols-3">
        {work.map((workItem) => (
          <div
            key={workItem.name}
            className="group relative h-full rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-colors dark:border-neutral-700/50 dark:bg-neutral-800/50"
          >
            <div className="h-full">
              <div className="z-30 flex h-full flex-col justify-between px-5 py-4 text-left">
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
                        <li className="opacity-75" key={item}>
                          {item}
                        </li>
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
