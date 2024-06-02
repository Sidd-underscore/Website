"use client";

import { Link } from "@/components/ui/link";
import { useEffect, useRef } from "react";
import { achievements } from "@/lib/achievements";
import { CalendarIcon } from "@radix-ui/react-icons";
import { TrophyIcon } from "@heroicons/react/20/solid";

export function Achievements() {
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
      <h2 className="text-4xl font-semibold">Competitions & Awards</h2>
      <p className="mt-1 text-sm">
        I have won some competitions, and achieved certain awards. Here they
        are!
      </p>

      <div
        ref={projectsElement}
        className="projects mt-12 grid w-full grid-flow-row grid-cols-1 gap-14 text-center md:gap-4 md:text-left lg:mb-0 lg:grid-cols-2"
      >
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="project group relative rounded-lg transition-colors"
          >
            <div className="project-content">
              <div className="z-30 flex h-full flex-col justify-between px-5 py-4">
                <div>
                  <h3 className={`mb-3 text-2xl font-semibold`}>
                    {achievement.name}
                  </h3>
                  <p className="flex items-center space-x-2 text-xs opacity-75">
                    <span className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 shrink-0" />
                      <span>{achievement.date}</span>
                    </span>

                    <span>•</span>

                    {achievement.type === "award" && (
                      <span className="flex items-center space-x-2">
                        <TrophyIcon className="h-4 w-4 shrink-0" />
                        <span>{achievement.ranking}</span>
                      </span>
                    )}
                  </p>
                  <div className={`m-4 text-sm`}>
                    <ul className="list-disc text-left">
                      {achievement.descriptions.map((description) => (
                        <li className="opacity-75" key={description}>{description}</li>
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
