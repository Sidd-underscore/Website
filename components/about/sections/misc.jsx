import { motion } from "motion/react";
import React from "react";

export function MiscSection({ display, opacity, position }) {
  return (
    <>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[20rem] w-[20rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-100 text-sm select-none sm:h-[24rem] sm:w-[24rem] md:text-base dark:border-pink-100/15"
      >
        <p className="absolute -top-20 left-4 max-w-40 opacity-90 sm:-top-10 sm:-left-10 md:-top-14 md:-left-20">
          I generally love tech, photography, and lighting design.
        </p>
        <p className="absolute right-4 max-w-40 text-right opacity-90 sm:-right-28 md:top-20 md:-right-44">
          I&apos;m an avid learner and an enthusiastic person in general,
        </p>
        <p className="absolute -bottom-10 left-4 max-w-56 text-left opacity-90 sm:-bottom-4 sm:-left-36 xl:-bottom-10 xl:-left-48">
          hoping to, at the end of the day, help people and learn something new.
        </p>
      </motion.div>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[16rem] w-[16rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-200 select-none sm:h-[18rem] sm:w-[18rem] dark:border-pink-200/40"
      />
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[10rem] w-[10rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-300 select-none sm:h-[12rem] sm:w-[12rem] dark:border-pink-300/75"
      />
    </>
  );
}
