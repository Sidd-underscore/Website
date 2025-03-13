import { motion } from "motion/react";
import React from "react";
import {
  OBSLogo,
  ETCLogo,
  AudixLogo,
  QLabLogo,
  MakitaLogo,
  SoundcraftLogo,
} from "@/components/ui/icons";
import { Link } from "@/components/ui/link";

export function TechSection({ display, opacity, position }) {
  return (
    <>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[20rem] w-[20rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-100 text-sm select-none sm:h-[24rem] sm:w-[24rem] md:text-base dark:border-pink-100/15"
      >
        <p className="absolute -top-32 left-0 max-w-[30vw] opacity-90 sm:-top-20 sm:-left-20 sm:max-w-[40vw] md:-top-14 md:-left-20 lg:-top-20 lg:-left-36">
          I livestream weekly using OBS and PTZ Optics for the{" "}
          <Link
            href="https://themadeleine.edu"
          >
            Madeleine Parish.
          </Link>
        </p>
        <p className="absolute -top-24 right-0 max-w-[28vw] text-right opacity-90 sm:-right-28 sm:max-w-[40vw] md:top-8 md:-right-36 md:max-w-60 lg:top-24 lg:-right-56">
          I also run other A/V positions, like mixing live sound during
          performances, for the Parish. <Link
          href="/work/av-livestreaming"
          
        >
          Learn more
        </Link>
        </p>
        <p className="absolute -bottom-24 max-w-72 text-left opacity-90 sm:-bottom-24 sm:-left-28 lg:-bottom-20 lg:-left-56 lg:max-w-80">
          Additionally, I am a theatre technician with experience in designing
          and hanging/focusing lights, projection, networking/patching, and
          carpentry. <Link
          href="/work/tech-theatre"
          
        >
          Learn more
        </Link>
        </p>
        <motion.div className="flex">
          <div className="mt-56 h-fit bg-neutral-50 sm:mt-64 dark:bg-neutral-950">
            <QLabLogo className="size-8 rounded-full opacity-50 sm:size-9 md:size-10" />
          </div>
          <div className="-mt-6 ml-26 h-fit bg-neutral-50 sm:-mt-6 sm:ml-34 dark:bg-neutral-950">
            <MakitaLogo className="size-12 text-black opacity-50 invert-0 sm:size-13 md:size-14 dark:text-white dark:invert" />
          </div>
          <div className="mt-56 ml-20 h-fit bg-neutral-50 sm:mt-64 sm:ml-28 dark:bg-neutral-950">
            <SoundcraftLogo className="size-16 fill-black opacity-75 sm:size-17 md:size-18 dark:*:fill-white" />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[16rem] w-[16rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-200 select-none sm:h-[18rem] sm:w-[18rem] dark:border-pink-200/40"
      >
        <motion.div className="flex">
          <div className="mt-16 -ml-2 h-fit bg-neutral-50 sm:mt-[3.5rem] sm:-ml-2 dark:bg-neutral-950">
            <OBSLogo className="size-8 opacity-50 sm:size-9 md:size-10" />
          </div>
          <div className="mt-60 ml-[5rem] h-fit rounded-full bg-neutral-50 sm:mt-[16.5rem] sm:ml-[5.5rem] dark:bg-neutral-950">
            <ETCLogo className="size-14 fill-black opacity-75 dark:*:fill-white" />
          </div>
          <div className="mt-[3.5rem] ml-14 h-fit bg-neutral-50 dark:bg-neutral-950">
            <AudixLogo className="size-14 fill-neutral-950 stroke-neutral-950 text-black opacity-75 dark:fill-white dark:stroke-white dark:text-white" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ display, opacity, position }}
        className="top-[50%] left-[50%] h-[10rem] w-[10rem] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink-300 select-none sm:h-[12rem] sm:w-[12rem] dark:border-pink-300/75"
      />
    </>
  );
}
