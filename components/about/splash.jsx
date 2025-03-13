"use client";

import { useNavbarLogo } from "@/lib/utils";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { MainSection } from "./sections/main";
import { CodeSection } from "./sections/code";
import { TechSection } from "./sections/tech";
import { MiscSection } from "./sections/misc";
import { FinalSection } from "./sections/final";

export function AboutSplash() {
  const { setNavbarLogo } = useNavbarLogo();
  const containerRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [navRect, setNavRect] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);

      const nav = document
        .querySelector('[data-element-reference="nav"]')
        ?.getBoundingClientRect();
      if (nav) {
        setNavRect({ left: nav.left, top: nav.top });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress: scrollYProgressOfContainer } = useScroll({
    target: containerRef,
  });
  const { scrollYProgress } = useScroll();

  const splashKeyframes = [0, 0.25];
  const avatarKeyframesX = [0, 0.01, 0.02, 0.05, 0.09, 0.175];
  const avatarKeyframesY = [0, 0.01, 0.02, 0.05, 0.09, 0.175];

  const svgOpacity = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const svgScale = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const textOpacity = useTransform(scrollYProgress, splashKeyframes, [1, 0]);
  const textScale = useTransform(scrollYProgress, splashKeyframes, [1, 0.8]);

  const avatarLeft = useTransform(
    scrollYProgressOfContainer,
    avatarKeyframesX,
    [
      12,
      12,
      windowWidth / 60,
      windowWidth / 45,
      windowWidth / 40,
      windowWidth / 2 - navRect.left - 70,
    ],
  );
  const avatarTop = useTransform(scrollYProgressOfContainer, avatarKeyframesY, [
    10,
    10,
    windowHeight / 8,
    windowHeight / 6,
    windowHeight / 4,
    windowHeight / 2 - navRect.top - 60,
  ]);
  const avatarSize = useTransform(
    scrollYProgressOfContainer,
    avatarKeyframesX,
    [32, 40, 56, 64, 86, 128],
  );

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

  const [shouldNavbarLogoHover, setShouldNavbarLogoHover] = useState(true);
  const prevValues = useRef({
    avatarLeft,
    avatarTop,
    avatarSize,
    shouldNavbarLogoHover,
  });

  useMotionValueEvent(scrollYProgressOfContainer, "change", (latest) => {
    setShouldNavbarLogoHover(latest < 0.01);
  });

  useEffect(() => {
    const {
      avatarLeft: prevLeft,
      avatarTop: prevTop,
      avatarSize: prevSize,
      shouldNavbarLogoHover: prevHover,
    } = prevValues.current;
    if (
      prevLeft !== avatarLeft ||
      prevTop !== avatarTop ||
      prevSize !== avatarSize ||
      prevHover !== shouldNavbarLogoHover
    ) {
      setNavbarLogo({
        link: "/",
        label: (
          <motion.img
            style={{
              left: avatarLeft,
              top: avatarTop,
              width: avatarSize,
              height: avatarSize,
            }}
            alt="sidd's logo"
            src="/images/sidd.png"
            className="fixed top-1 bottom-1 left-1 h-11 w-auto rounded-full grayscale hover:grayscale-0 hover:invert-0! hover:transition-all hover:duration-500 dark:invert"
          />
        ),
        shortLabel: (
          <motion.img
            style={{
              left: avatarLeft,
              top: avatarTop,
              width: avatarSize,
              height: avatarSize,
            }}
            alt="sidd's logo"
            src="/images/sidd.png"
            className="fixed top-1 bottom-1 left-1 h-11 w-auto rounded-full grayscale hover:grayscale-0 hover:invert-0! hover:transition-all hover:duration-500 dark:invert"
          />
        ),
      });
      prevValues.current = {
        avatarLeft,
        avatarTop,
        avatarSize,
        shouldNavbarLogoHover,
      };
    }
  }, [avatarLeft, avatarTop, avatarSize, shouldNavbarLogoHover, setNavbarLogo]);

  return (
    <div
      ref={containerRef}
      className="relative -m-6 h-[500vh] md:-m-12 2xl:-m-24"
    >
      <motion.section className="relative text-neutral-950 dark:text-white">
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
