import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const focusItems = [
  {
    icon: "StarOrbit",
    title: "Software",
    text: "Tools, websites, and production-ready applications for clients and personal projects.",
    className: "bg-[#FFE121] md:rotate-[-1.5deg]",
  },
  {
    icon: "Sun",
    title: "Live Events",
    text: "Lighting, livestreams, set builds, and more.",
    className: "bg-[#22FF00] md:rotate-[1deg]",
  },
  {
    icon: "Bloom",
    title: "Experiments",
    text: "General side projects I start to know how something works.",
    className: "bg-[#FF80F2] md:rotate-[-0.75deg]",
  },
];

export function MainSection({ textOpacity, textScale, svgOpacity, svgScale }) {
  return (
    <motion.section className="relative z-20 flex p-6 min-h-[calc(100vh-192px)] w-full items-center overflow-hidden px-4 py-6 text-black sm:py-8 md:px-10 lg:px-16 xl:px-24">
      <div className="pointer-events-none absolute right-16 bottom-16 hidden rotate-10 items-center justify-center border-2 border-black bg-[#00D7FF] shadow-[6px_6px_0_#000] sm:flex p-4">
        <Icon
          name="StarTrail"
          size="lg"
          className="h-7 w-14 opacity-90 md:h-8 md:w-16"
        />
      </div>
      <div className="pointer-events-none absolute bottom-6 left-20 hidden -rotate-7 items-center justify-center border-2 border-black bg-[#FF80F2] shadow-[6px_6px_0_#000] sm:flex p-4">
        <Icon
          name="ShootingStar_2"
          size="default"
          className="h-6 w-12 opacity-90 md:h-7 md:w-14"
        />
      </div>

      <motion.div
        style={{ opacity: svgOpacity, scale: svgScale }}
        className="relative mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:max-w-6xl"
      >
        <div className="relative h-44 ">
          <div className="absolute inset-0 rotate-[-2deg] border-2 border-black bg-white shadow-[8px_8px_0_#000]" />
         
          <div className="absolute inset-3 rotate-[1.5deg] border-2 border-black bg-white sm:inset-4">
            <Image
              src="/images/sidd.svg"
              alt="Sidd"
              fill
              sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 24rem, (min-width: 768px) 32rem, 90vw"
              priority
              className="object-contain p-4 sm:p-6"
            />
          </div>
         
        </div>

        <div className="relative min-w-0 mt-10 lg:mt-0">
          <motion.div style={{ opacity: textOpacity, scale: textScale }}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex max-w-full flex-wrap items-center gap-2 border-2 border-black bg-white px-3 py-2 font-mono text-xs leading-tight font-black uppercase shadow-[4px_4px_0_#000]">
                <Icon name="ShootingStar" size="sm" className="shrink-0" />
                hello!
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl leading-[1.02] font-bold text-black">
               I build software, help run live events, and frequently start side-projects.
            </h1>

          
          </motion.div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:gap-4">
            {focusItems.map((item) => (
              <article
                className={`${item.className} border-2 border-black p-3 shadow-[5px_5px_0_#000] lg:p-4`}
                key={item.title}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="font-mono text-xs font-black uppercase lg:text-sm">
                    {item.title}
                  </h2>
                  <Icon name={item.icon} size="sm" className="shrink-0" />
                </div>
                <p className="text-xs leading-snug font-black lg:text-sm">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <Button asChild size="sm" variant="default">
              <Link href="/projects">Projects</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/work">Work</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/coding">Coding</Link>
            </Button>
            <Button asChild size="sm" variant="destructive">
              <Link href="/lightshows">Lightshows</Link>
            </Button>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 font-mono text-xs font-black uppercase">
            <Icon name="StarTrail" size="sm" className="opacity-70" />
            Or, scroll to explore
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
