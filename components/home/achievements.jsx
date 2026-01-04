"use client";

import { achievements } from "@/lib/achievements";
import {
  CalendarIcon,
  CardStackIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { TrophyIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { cn, formatArrayIntoSentence } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import autoAnimate from "@formkit/auto-animate";

export function Achievements({ className, defaultAchievementTypes }) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  function gatherAllAchievementData() {
    const types = [];

    achievements.forEach((achievement) => {
      achievement.type.forEach((type) => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });
    });
    return { types };
  }

  const achievementData = gatherAllAchievementData();

  const [achievementTypesToShow, setAchievementTypesToShow] = useState(
    defaultAchievementTypes || achievementData.types,
  );

  const [achievementsToDisplay, setAchievementsToDisplay] = useState([]);

  useEffect(() => {
    let tempAchievements = achievements.filter((achievement) => {
      const anyTypeIncluded = achievement.type.some((type) =>
        achievementTypesToShow.includes(type),
      );

      return anyTypeIncluded;
    });

    setAchievementsToDisplay(tempAchievements);
  }, [achievementTypesToShow]);

  return (
    <div className={cn("my-32 w-full text-left", className)}>
      <div className="flex items-end justify-between space-x-2">
        <div>
          <h2 className="text-4xl font-semibold">
            {defaultAchievementTypes
              ? formatArrayIntoSentence(
                  defaultAchievementTypes,
                  undefined,
                  undefined,
                  true,
                ) + " Achievements"
              : "Competitions, Awards, and the Rest"}
          </h2>
          <p className="mt-1 text-sm">
            Here lies all the recognition I have received for my work or other
            experience{" "}
            {defaultAchievementTypes
              ? " in relation to " +
                formatArrayIntoSentence(
                  defaultAchievementTypes,
                  undefined,
                  ", or ",
                )
              : ""}
            . Thank you so much to all these awesome organizations!
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
              {achievementData.types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  onSelect={(event) => event.preventDefault()}
                  checked={achievementTypesToShow?.includes(type)}
                  onCheckedChange={(e) =>
                    e
                      ? setAchievementTypesToShow([
                          ...achievementTypesToShow,
                          type,
                        ])
                      : setAchievementTypesToShow(
                          achievementTypesToShow.filter((t) => t != type),
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
        className={`relative mt-12 w-full ${achievementsToDisplay.length > 0 ? "grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-6" : ""} text-center md:text-left lg:mb-0`}
      >
        {achievementsToDisplay.length > 0 ? (
          achievementsToDisplay.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`group relative rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-colors dark:border-neutral-700/50 dark:bg-neutral-800/50 ${
                index == 3 || index == 4 ? "xl:col-span-3" : "xl:col-span-2"
              }`}
            >
              <div className={`h-full ${achievement.split ? "space-y-4" : ""}`}>
                <div className="z-30 flex h-full flex-col justify-between px-5 py-4">
                  <div>
                    <h3 className={`mb-3 text-2xl font-semibold`}>
                      {achievement.name}
                    </h3>
                    <p className="flex items-center space-x-2 text-xs opacity-75">
                      <span className="flex items-center space-x-2">
                        <CalendarIcon className="size-4 shrink-0" />
                        <span>{achievement.date}</span>
                      </span>

                      <span>•</span>

                      {achievement.category === "award" && (
                        <span className="flex items-center space-x-2">
                          <TrophyIcon className="size-4 shrink-0" />
                          <span>{achievement.ranking}</span>
                        </span>
                      )}

                      {achievement.category === "membership" && (
                        <span className="flex items-center space-x-2">
                          <CardStackIcon className="size-4 shrink-0" />
                          <span>Membership by Invitation</span>
                        </span>
                      )}

                      {achievement.category === "certification" && (
                        <span className="flex items-center space-x-2">
                          <PaperPlaneIcon className="size-4 shrink-0 -rotate-45" />
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

                  {achievement.split && (
                    <div
                      className={`grid grid-cols-1 gap-4 ${achievement.split.type === "score" ? "grid-cols-2" : "md:grid-cols-2 xl:grid-cols-1"}`}
                    >
                      {achievement.split.children.map((splitItem, index) => (
                        <div
                          key={index}
                          className={`rounded-lg border-2 border-neutral-300/30 bg-neutral-200 p-4 dark:border-neutral-700 dark:bg-neutral-800 ${
                            achievement.split.type === "score"
                              ? "transition duration-400 hover:bg-linear-to-br hover:from-pink-400/75 hover:to-pink-300/75 hover:shadow-md"
                              : ""
                          }`}
                        >
                          <small className="text-sm opacity-75">
                            {splitItem.date}
                          </small>

                          <h4 className="text-base mb-2">{splitItem.name}</h4>

                          {achievement.split.type === "score" && (
                            <p className="text-2xl font-bold">
                                {splitItem.score}
                            </p>
                          )}

                          {achievement.split.type === "description" && (
                            <ul className="text-sm">
                              {splitItem.descriptions.map((description) => (
                                <p key={description}>
                                  {description}
                                </p>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center text-neutral-400">
            No achievements found... Try{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                setAchievementTypesToShow(gatherAllAchievementData().types);
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
