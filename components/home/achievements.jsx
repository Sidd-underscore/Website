"use client";

import { achievements } from "@/lib/achievements";
import {
  ArrowTopRightIcon,
  CalendarIcon,
  CardStackIcon,
  PaperPlaneIcon,
  MixerVerticalIcon,
  Cross2Icon,
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
import autoAnimate from "@formkit/auto-animate";
import { Link } from "../ui/link";

export function Achievements({ className, defaultAchievementTypes }) {
  const parent = useRef(null);
  const filterRowRef = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  useEffect(() => {
    filterRowRef.current && autoAnimate(filterRowRef.current);
  }, []);

  function gatherAllAchievementData() {
    const types = [];
    achievements.forEach((a) =>
      a.type.forEach((t) => !types.includes(t) && types.push(t)),
    );
    return { types };
  }

  const achievementData = gatherAllAchievementData();

  const [achievementTypesToShow, setAchievementTypesToShow] = useState(
    defaultAchievementTypes || achievementData.types,
  );

  const [achievementsToDisplay, setAchievementsToDisplay] = useState([]);

  useEffect(() => {
    setAchievementsToDisplay(
      achievements.filter((a) =>
        a.type.some((t) => achievementTypesToShow.includes(t)),
      ),
    );
  }, [achievementTypesToShow]);

  return (
    <div className={cn("my-32 w-full text-left", className)}>
      <div>
        <h2 className="text-4xl font-semibold">
          {defaultAchievementTypes
            ? formatArrayIntoSentence(
                defaultAchievementTypes,
                undefined,
                undefined,
                true,
              ) + " Achievements"
            : "Achievements"}
        </h2>
        <p className="mt-1 text-sm">
          Recognition I've received for my work and experience.
        </p>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 space-x-2 px-4 py-2">
              <MixerVerticalIcon />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 capitalize">
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            {achievementData.types.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                onSelect={(e) => e.preventDefault()}
                checked={achievementTypesToShow.includes(type)}
                onCheckedChange={(v) =>
                  v
                    ? setAchievementTypesToShow([
                        ...achievementTypesToShow,
                        type,
                      ])
                    : setAchievementTypesToShow(
                        achievementTypesToShow.filter((t) => t !== type),
                      )
                }
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {achievementTypesToShow.length < achievementData.types.length && (
          <>
            <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
            {achievementTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="h-8 rounded-full px-3 capitalize"
                onClick={() =>
                  setAchievementTypesToShow(
                    achievementTypesToShow.filter((t) => t !== type),
                  )
                }
              >
                {type}
                <Cross2Icon className="ml-1 size-3.5" />
              </Button>
            ))}
            <Button
              variant="ghost"
              className="h-8 px-2 text-sm"
              onClick={() => setAchievementTypesToShow(achievementData.types)}
            >
              Clear all
            </Button>
          </>
        )}
      </div>

      <div
        ref={parent}
        className={`relative mt-12 w-full ${
          achievementsToDisplay.length
            ? "grid grid-cols-1 gap-4 lg:grid-cols-2"
            : ""
        }`}
      >
        {achievementsToDisplay.length > 0 ? (
          achievementsToDisplay.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`group relative rounded-lg border border-neutral-300/50 bg-neutral-200/25 transition-colors dark:border-neutral-700/50 dark:bg-neutral-800/50`}
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

                          <h4 className="mb-2 text-base">{splitItem.name}</h4>

                          {achievement.split.type === "score" && (
                            <p className="text-2xl font-bold">
                              {splitItem.score}
                            </p>
                          )}

                          {achievement.split.type === "description" && (
                            <ul className="text-sm">
                              {splitItem.descriptions.map((description) => (
                                <p key={description}>{description}</p>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {achievement.link && (
                    <div>
                      <Link
                        className="mt-2 flex w-fit items-center space-x-2"
                        target="_blank"
                        href={achievement.link.url}
                      >
                        <span> {achievement.link.text}</span>{" "}
                        <ArrowTopRightIcon />
                      </Link>
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
