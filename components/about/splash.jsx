"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState } from "react";

import { MainSection } from "./sections/main";
import { CodeSection } from "./sections/code";
import { TechSection } from "./sections/tech";
import { MiscSection } from "./sections/misc";
import { FinalSection } from "./sections/final";

export function AboutSplash() {
  const containerRef = useRef(null);

  const { scrollYProgress: scrollYProgressOfContainer } = useScroll({
    target: containerRef,
  });
  const { scrollYProgress } = useScroll();

  const splashKeyframes = [0, 0.25];

  const svgOpacity = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const svgScale = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const textOpacity = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const textScale = useTransform(scrollYProgress, splashKeyframes, [1, 0.8]);

  const codeRingsOpacity = useTransform(
    scrollYProgressOfContainer,
    [0.1, 0.2, 0.35, 0.4],
    [0, 1, 1, 0],
  );
  const livestreamRingsOpacity = useTransform(
    scrollYProgressOfContainer,
    [0.35, 0.4, 0.55, 0.6],
    [0, 1, 1, 0],
  );
  const miscRingsOpacity = useTransform(
    scrollYProgressOfContainer,
    [0.55, 0.6, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const finalImageDecorationOpacity = useTransform(
    scrollYProgressOfContainer,
    [0.8, 0.9],
    [0, 1],
  );

  const ringsPosition = useTransform(scrollYProgressOfContainer, (pos) =>
    pos >= 0.1 ? "fixed" : "relative",
  );
  const finalImageDecorationPosition = useTransform(
    scrollYProgressOfContainer,
    (pos) => (pos >= 0.8 ? "fixed" : "relative"),
  );

  const [codeRingsDisplay, setCodeRingsDisplay] = useState("none");
  const [livestreamRingsDisplay, setLivestreamRingsDisplay] = useState("none");
  const [miscRingsDisplay, setMiscRingsDisplay] = useState("none");
  const [finalImageDecorationDisplay, setFinalImageDecorationDisplay] =
    useState("none");

  useMotionValueEvent(codeRingsOpacity, "change", (latest) => {
    setCodeRingsDisplay(latest > 0 ? "block" : "none");
  });

  useMotionValueEvent(livestreamRingsOpacity, "change", (latest) => {
    setLivestreamRingsDisplay(latest > 0 ? "block" : "none");
  });

  useMotionValueEvent(miscRingsOpacity, "change", (latest) => {
    setMiscRingsDisplay(latest > 0 ? "block" : "none");
  });

  useMotionValueEvent(finalImageDecorationOpacity, "change", (latest) => {
    setFinalImageDecorationDisplay(latest > 0 ? "block" : "none");
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh]"
    >
      <motion.section className="relative text-black">
        <MainSection
          textOpacity={textOpacity}
          textScale={textScale}
          svgOpacity={svgOpacity}
          svgScale={svgScale}
        />
        <CodeSection
          display={codeRingsDisplay}
          opacity={codeRingsOpacity}
          position={ringsPosition}
        />
        <TechSection
          display={livestreamRingsDisplay}
          opacity={livestreamRingsOpacity}
          position={ringsPosition}
        />
        <MiscSection
          display={miscRingsDisplay}
          opacity={miscRingsOpacity}
          position={ringsPosition}
        />
      </motion.section>
      <FinalSection
        display={finalImageDecorationDisplay}
        opacity={finalImageDecorationOpacity}
        position={finalImageDecorationPosition}
      />
    </div>
  );
}

export default AboutSplash;
