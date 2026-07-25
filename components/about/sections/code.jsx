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
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CodeSection({ display, opacity, position }) {
  return (
    <>
      <motion.div
        style={{ display, opacity, position }}
        className="relative top-[50%] left-[50%] h-88 w-88 translate-x-[-50%] translate-y-[-50%] text-black select-none md:h-104 md:w-104"
      >
        {/* Portal core (kept separate so callouts can overflow) */}
        <div className="absolute inset-0 rounded-full bg-white">
          <div className="checker-surface absolute inset-0 rounded-full opacity-20" />
          <div className="pointer-events-none absolute inset-0 translate-x-0.75 -translate-y-0.5 rounded-full border-2 border-[#22FF00]" />
          <div className="pointer-events-none absolute inset-0 -translate-x-0.5 translate-y-0.75 rounded-full border-2 border-[#FF80F2]" />

          <div className="absolute inset-8 rounded-full border-2 border-black bg-white/80" />
          <div className="absolute inset-16 rounded-full border-2 border-black bg-[#FFE121]/60" />

          {/* Center chip */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full panel bg-white p-4 text-center font-mono text-xs font-black uppercase">
            <Icon name="StarOrbit" size="xl" className="opacity-90" />
          </div>

          {/* Tool badges */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-6 rounded-full panel p-2 bg-neutral-100">
              <TailwindCssIcon className="size-7 opacity-90 md:size-8" />
            </div>
            <div className="absolute top-8 right-6 rounded-full panel p-2 bg-neutral-100">
              <RadixUIIcon className="size-7 text-black opacity-90 md:size-8" />
            </div>
            <div className="absolute bottom-10 left-8 rounded-full panel p-2 bg-neutral-100">
              <GitHubIcon className="size-7 fill-black opacity-90 md:size-8" />
            </div>
            <div className="absolute right-8 bottom-10 rounded-full panel p-2 bg-neutral-100">
              <VisualStudioCodeIcon className="size-7 opacity-90 md:size-8" />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000]">
              <NextJSLogo className="size-7 fill-black opacity-90 md:size-8" />
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000]">
              <ReactLogo className="size-7 text-black opacity-90 md:size-8" />
            </div>
          </div>
        </div>

        {/* Callouts */}
        <p className="card absolute -top-32 left-0 w-[min(16rem,70vw)] p-4 text-xs leading-snug md:-top-8 md:-left-48 md:text-sm">
          <span className="flex items-center gap-2">
            <Icon name="Sun" size="sm" className="opacity-70" />I code and
            design user interfaces
          </span>
        </p>
        <p className="card absolute -top-20 right-0 w-[min(16rem,70vw)] p-4 text-right text-xs leading-snug md:top-16 md:-right-48 md:text-sm">
          Mostly using <span className="font-black">Next.js</span> and{" "}
          <span className="font-black">Tailwind</span>.
        </p>
        <p className="card absolute -bottom-20 left-10 w-[min(20rem,80vw)] p-4 text-xs leading-snug md:-bottom-10 md:-left-32 md:text-sm">
          I code with <span className="font-black">Visual Studio Code</span>,
          and push everything to <span className="font-black">GitHub</span>.
        </p>

        {/* CTA */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2">
          <Button asChild size="sm" variant="secondary">
            <Link href="/coding">See coding</Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
