import { motion } from "motion/react";
import React from "react";
import {
  TailwindCssIcon,
  RadixUIIcon,
  GitHubIcon,
  VisualStudioCodeIcon,
  NextJSLogo,
  ReactLogo,
} from "@/components/ui/icons";
import { Link } from "@/components/ui/link";

export function CodeSection({ display, opacity, position }) {
  return (
    <>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[20rem] w-[20rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-100 text-sm select-none sm:h-[24rem] sm:w-[24rem] md:text-base dark:border-pink-100/15"
      >
        <p className="absolute -top-32 left-0 max-w-40 opacity-90 sm:-top-10 sm:-left-10 md:-top-14 md:-left-20">
          I code and design user interfaces
        </p>
        <p className="absolute -top-20 right-0 max-w-40 text-right opacity-90 sm:-right-28 md:top-20 md:-right-44">
          using tools like Next.js, TailwindCSS and Radix UI.
        </p>
        <p className="absolute -bottom-16 left-14 max-w-72 text-left opacity-90 sm:-bottom-4 sm:-left-28 xl:-bottom-10 xl:-left-48">
          I code with Visual Studio Code, and push everything to GitHub.
        </p>
        <motion.div className="flex">
          <div className="mt-56 h-fit bg-neutral-50 sm:mt-64 dark:bg-neutral-950">
            <TailwindCssIcon className="size-8 opacity-50 sm:size-9 md:size-10" />
          </div>
          <div className="-mt-4 ml-[7.5rem] h-fit bg-neutral-50 sm:-mt-6 sm:ml-36 dark:bg-neutral-950">
            <RadixUIIcon className="size-8 text-black opacity-50 sm:size-9 md:size-10 dark:text-white" />
          </div>
          <div className="mt-56 ml-24 h-fit bg-neutral-50 sm:mt-64 sm:ml-28 dark:bg-neutral-950">
            <GitHubIcon className="size-8 fill-black opacity-50 sm:size-9 md:size-10 dark:*:fill-white" />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[16rem] w-[16rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-200 select-none sm:h-[18rem] sm:w-[18rem] dark:border-pink-200/40"
      >
        <motion.div className="flex">
          <div className="mt-16 -ml-2 h-fit bg-neutral-50 sm:mt-[3.5rem] sm:-ml-2 dark:bg-neutral-950">
            <VisualStudioCodeIcon className="size-8 opacity-50 sm:size-9 md:size-10" />
          </div>
          <div className="mt-60 ml-[5.75rem] h-fit bg-neutral-50 sm:mt-[16.5rem] sm:ml-24 dark:bg-neutral-950">
            <NextJSLogo className="size-8 fill-black opacity-50 sm:size-9 md:size-10 dark:*:fill-white" />
          </div>
          <div className="mt-16 ml-20 h-fit bg-neutral-50 sm:mt-[3.5rem] sm:ml-[5rem] dark:bg-neutral-950">
            <ReactLogo className="size-8 text-black opacity-50 sm:size-9 md:size-10 dark:text-white" />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ display, opacity, position }}
        className="relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <Link
          href="/coding"
          className="absolute top-64 left-[50%] w-24 translate-x-[-50%] translate-y-[-50%] sm:top-56 sm:ml-48"
        >
          Learn more
        </Link>
      </motion.div>
    </>
  );
}
