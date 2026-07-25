import { motion } from "motion/react";
import React from "react";
import { Icon } from "@/components/ui/icon";

export function MiscSection({ display, opacity, position }) {
  return (
    <motion.div
      style={{ display, opacity, position }}
      className="relative top-[50%] left-[50%] h-88 w-88 translate-x-[-50%] translate-y-[-50%] text-black select-none md:h-104 md:w-104"
    >
      {/* Portal core */}
      <div className="absolute inset-0 rounded-full border-2 border-black bg-white shadow-[10px_10px_0_#000]">
        <div className="checker-surface absolute inset-0 rounded-full opacity-20" />
        <div className="pointer-events-none absolute inset-0 translate-x-0.75 -translate-y-0.5 rounded-full border-2 border-[#00D7FF]" />
        <div className="pointer-events-none absolute inset-0 -translate-x-0.75 translate-y-0.5 rounded-full border-2 border-[#FF80F2]" />

        <div className="absolute inset-8 rounded-full border-2 border-black bg-white/80 shadow-[6px_6px_0_#000]" />
        <div className="absolute inset-16 rounded-full border-2 border-black bg-[#FF80F2]/15" />

        {/* Center chip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white p-4 text-center font-mono text-xs font-black uppercase shadow-[5px_5px_0_#000]">
          <Icon name="Bloom" size="xl" className="opacity-90" />
        </div>

        {/* Icon badges */}
        <div className="absolute inset-0">
          <div className="absolute top-12 left-6 rounded-full panel p-2 bg-neutral-100">
            <Icon name="Globe" className="opacity-90" size="sm" />
          </div>
          <div className="absolute top-12 right-6 rounded-full panel p-2 bg-neutral-100">
            <Icon name="StarTrail" className="opacity-90" size="sm" />
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full panel p-2 bg-neutral-100">
            <Icon name="Sun" className="opacity-90" size="sm" />
          </div>
        </div>
      </div>

      {/* Callouts */}
      <p className="card absolute -top-32 left-0 w-[min(18rem,80vw)] p-4 text-xs leading-snug md:-top-8 md:-left-48 md:text-sm">
        <span className="flex items-center gap-2">
          <Icon name="CircleStarFill" size="sm" className="opacity-70" />I
          generally love tech, lighting design, and working collaboratively
          alongside others.
        </span>
      </p>
      <p className="card absolute -top-12 right-0 w-[min(18rem,80vw)] p-4 text-right text-xs leading-snug md:top-28 md:-right-48 md:text-sm">
        I&apos;m an avid learner and an enthusiastic person in general,{" "}
      </p>
      <p className="card absolute -bottom-20 left-10 w-[min(20rem,85vw)] p-4 text-xs leading-snug md:-bottom-10 md:-left-32 md:text-sm">
        hoping to, at the end of the day, help people and learn something
        new.{" "}
      </p>
    </motion.div>
  );
}
