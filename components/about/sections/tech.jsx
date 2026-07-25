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
import { Icon } from "@/components/ui/icon";

export function TechSection({ display, opacity, position }) {
  return (
    <motion.div
      style={{ display, opacity, position }}
      className="relative top-[50%] left-[50%] h-88 w-88 translate-x-[-50%] translate-y-[-50%] text-black select-none md:h-104 md:w-104"
    >
      {/* Portal core */}
      <div className="absolute inset-0 rounded-full border-2 border-black bg-white shadow-[10px_10px_0_#000]">
        <div className="checker-surface absolute inset-0 rounded-full opacity-20" />
        <div className="pointer-events-none absolute inset-0 translate-x-0.75 -translate-y-0.5 rounded-full border-2 border-[#FFE121]" />
        <div className="pointer-events-none absolute inset-0 -translate-x-0.75 translate-y-0.5 rounded-full border-2 border-[#FF80F2]" />

        <div className="absolute inset-8 rounded-full border-2 border-black bg-white/80 shadow-[6px_6px_0_#000]" />
        <div className="absolute inset-16 rounded-full border-2 border-black bg-[#22FF00]/25" />

        {/* Center chip */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white p-4 text-center font-mono text-xs font-black uppercase shadow-[5px_5px_0_#000]">
          <Icon name="StarGroup2" size="xl" className="opacity-90" />
        </div>

        {/* Tool badges */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-6 rounded-full panel p-2 bg-neutral-100">
            <OBSLogo className="size-7 opacity-90 md:size-8" />
          </div>
          <div className="absolute top-10 right-6 rounded-full panel p-2 bg-neutral-100">
            <QLabLogo className="size-7 rounded-full opacity-90 md:size-8" />
          </div>
          <div className="absolute bottom-10 left-8 rounded-full panel p-2 bg-neutral-100">
            <ETCLogo className="size-12 fill-black opacity-90" />
          </div>
          <div className="absolute right-8 bottom-10 rounded-full panel p-2 bg-neutral-100">
            <AudixLogo className="size-12 fill-neutral-950 stroke-neutral-950 text-black opacity-90" />
          </div>
          <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000]">
            <MakitaLogo className="size-12 text-black opacity-80" />
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000]">
            <SoundcraftLogo className="size-14 fill-black opacity-80" />
          </div>
        </div>
      </div>

      {/* Callouts */}
      <p className="card absolute -top-32 -left-10 w-[min(22rem,85vw)] p-4 text-xs leading-snug md:-top-8 md:-left-48 md:w-[min(24rem,40vw)] md:text-sm">
        <span className="flex items-start gap-2">
          <Icon name="ShootingStar" size="sm" className="opacity-70" />
          <span>
            I livestream weekly for the{" "}
            <Link href="https://themadeleine.edu">Madeleine Parish</Link> using
            OBS and PTZ optics.
          </span>
        </span>
      </p>
      <p className="card absolute -top-18 right-0 w-[min(22rem,85vw)] p-4 text-right text-xs leading-snug md:top-16 md:-right-48 md:w-[min(22rem,40vw)] md:text-sm">
        I als mix live sound and run A/V{" "}
        <Link href="/work/av-livestreaming">See more</Link>
      </p>
      <p className="card absolute -bottom-20 left-10 w-[min(22rem,85vw)] p-4 text-xs leading-snug md:-bottom-10 md:-left-32 md:w-[min(24rem,40vw)] md:text-sm">
        Additionally, I am a theatre technician with experience in designing and
        hanging/focusing lights, projection, networking/patching, and carpentry.{" "}
        <Link href="/work/tech-theatre">See more</Link>
      </p>
    </motion.div>
  );
}
