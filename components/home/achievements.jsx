"use client";

import { Icon } from "@/components/ui/icon";
import { achievements } from "@/lib/achievements";
import {
  MoveUpRight,
  CalendarClock,
  Users,
  Send,
  Settings2,
  X,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn, formatArrayIntoSentence } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

  const achievementsToDisplay = useMemo(
    () =>
      achievements.filter((a) =>
        a.type.some((t) => achievementTypesToShow.includes(t)),
      ),
    [achievementTypesToShow],
  );

  return (
    <section className={cn("my-32 w-full text-left", className)}>
      <div className="panel bg-[#FFE121] p-3">
        <h2 className="text-3xl leading-none font-black tracking-normal uppercase">
          <Icon name="StarGroup3" className="mr-2" size="lg" />
          {defaultAchievementTypes
            ? formatArrayIntoSentence(
                defaultAchievementTypes,
                undefined,
                undefined,
                true,
              ) + " Achievements"
            : "Achievements"}
        </h2>
        <div className="mt-4 flex items-end justify-between space-x-2 lg:mt-0">
          <p className="text-sm font-bold text-black">
            Recognition I&apos;ve received for my work and experience.
          </p>
          <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-2 py-2 md:px-4">
                <Settings2 className="size-4" />
                <span className="hidden md:block">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 capitalize"
            >
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
        </div>
      </div>

      {/* Filter row */}
      <div
        ref={filterRowRef}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        {achievementTypesToShow.length < achievementData.types.length && (
          <>
            {achievementTypesToShow.map((type) => (
              <Button
                key={type}
                variant="secondary"
                className="px-3 capitalize"
                onClick={() =>
                  setAchievementTypesToShow(
                    achievementTypesToShow.filter((t) => t !== type),
                  )
                }
              >
                {type}
                <X className="ml-1 size-3.5" />
              </Button>
            ))}
            <Button
              variant="destructive"
              size="icon"
              className="px-2 text-sm"
              onClick={() => setAchievementTypesToShow(achievementData.types)}
            >
              <X />
            </Button>
          </>
        )}
      </div>

      <div
        ref={parent}
        className={`relative mt-12 w-full ${
          achievementsToDisplay.length
            ? "grid grid-cols-1 gap-6 lg:grid-cols-2"
            : ""
        }`}
      >
        {achievementsToDisplay.length > 0 ? (
          achievementsToDisplay.map((achievement, index) => (
            <div
              key={achievement.id}
              className="card group relative overflow-hidden transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-[10px_10px_0_#000]"
            >
              <Icon
                name={index % 2 === 0 ? "Convergence" : "CircleStarFill"}
                className="absolute top-3 right-3 opacity-20 transition"
              />
              <div className={`h-full ${achievement.split ? "space-y-4" : ""}`}>
                <div className="z-30 flex h-full flex-col justify-between px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="mb-3 pr-12 text-2xl font-black tracking-normal uppercase">
                      {achievement.name}
                    </h3>

                    <p className="m-0 flex items-center gap-2 border-l-4 border-[#FFE121] pl-2 text-sm font-bold opacity-80">
                      <CalendarClock className="size-4 shrink-0" />
                      <span>{achievement.date}</span>
                    </p>

                    {achievement.category === "award" && (
                      <p className="m-0 flex items-center gap-2 border-l-4 border-[#FF80F2] pl-2 text-sm font-bold opacity-80">
                        <Trophy className="size-4 shrink-0" />
                        <span>{achievement.ranking}</span>
                      </p>
                    )}

                    {achievement.category === "membership" && (
                      <p className="m-0 flex items-center gap-2 border-l-4 border-[#FF80F2] pl-2 text-sm font-bold opacity-80">
                        <Users className="size-4 shrink-0" />
                        <span>Membership by Invitation</span>
                      </p>
                    )}

                    {achievement.category === "certification" && (
                      <p className="m-0 flex items-center gap-2 border-l-4 border-[#FF80F2] pl-2 text-sm font-bold opacity-80">
                        <Send className="size-4 shrink-0 -rotate-45" />
                        <span>Certification</span>
                      </p>
                    )}

                    <div className="m-4 text-sm font-medium">
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
                          className={`border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000] ${
                            achievement.split.type === "score"
                              ? "transition duration-400 hover:bg-linear-to-br hover:from-[#FF80F2] hover:to-[#FFE121]"
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
                    <div className="mt-4 flex justify-center md:justify-start">
                      <Link
                        className="w-full border-2 border-black bg-[#FFE121] px-3 py-2 text-center text-black no-underline shadow-[4px_4px_0_#000] group-hover:bg-[#22FF00]"
                        target="_blank"
                        href={achievement.link.url}
                      >
                        <span> {achievement.link.text}</span>
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
    </section>
  );
}
