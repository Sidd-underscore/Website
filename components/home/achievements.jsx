"use client";

import { achievements } from "@/lib/achievements";
import {
  CalendarIcon,
  CardStackIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { TrophyIcon } from "@heroicons/react/20/solid";

export function Achievements() {
  return (
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">
        Competitions, Awards, and the Rest
      </h2>
      <p className="mt-1 text-sm">
        Here lies all the recognition I have received for my work or other
        experience. Thank you so much to all these awesome organizations!
      </p>

      <div className="mt-12 grid w-full grid-flow-row grid-cols-1 gap-14 text-center md:gap-4 md:text-left lg:mb-0 lg:grid-cols-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="group relative h-full rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-colors dark:border-neutral-700/50 dark:bg-neutral-800/50"
          >
            <div className="h-full">
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

                    {achievement.type === "membership" && (
                      <span className="flex items-center space-x-2">
                        <CardStackIcon className="h-4 w-4 shrink-0" />
                        <span>Membership by Invitation</span>
                      </span>
                    )}

                    {achievement.type === "certification" && (
                      <span className="flex items-center space-x-2">
                        <PaperPlaneIcon className="h-4 w-4 shrink-0 -rotate-[45deg]" />
                        <span>Certification</span>
                      </span>
                    )}
                  </p>
                  <div className={`m-4 text-sm`}>
                    <ul className="list-disc text-left">
                      {achievement.descriptions.map((description) => (
                        <li className="opacity-75" key={description}>
                          {description}
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
