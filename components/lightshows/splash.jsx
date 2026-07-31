"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";

const BACKGROUND_IMAGES = [
  "/images/projects/lightshows/snapshots/2-pulpo-blue-orange.jpg",
  "/images/projects/lightshows/snapshots/2-pulpo-rainbow.jpg",
  "/images/projects/lightshows/snapshots/2-pulpo-plot.jpg",
  "/images/projects/lightshows/snapshots/3-isoknock-pink.png",
  "/images/projects/lightshows/snapshots/3-isoknock-behind.jpg",
  "/images/projects/lightshows/snapshots/1-iso-red.jpg",
  "/images/projects/lightshows/snapshots/1-iso-pink-side.jpg",
  "/images/projects/lightshows/snapshots/1-iso-pink-gold.jpg",
  "/images/projects/lightshows/snapshots/1-iso-plot.jpg",
];

export default function LightshowSplash() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [imageDims, setImageDims] = useState({});
  const [geometry, setGeometry] = useState(null);

  const heroRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setImageDims((prev) => ({
          ...prev,
          [src]: { width: img.naturalWidth, height: img.naturalHeight },
        }));
      };
      img.src = src;
    });
  }, []);

  const measure = useCallback(() => {
    if (!heroRef.current || !boxRef.current) return;
    const heroRect = heroRef.current.getBoundingClientRect();
    const boxRect = boxRef.current.getBoundingClientRect();
    setGeometry({
      heroWidth: heroRect.width,
      heroHeight: heroRect.height,
      boxLeft: boxRect.left - heroRect.left,
      boxTop: boxRect.top - heroRect.top,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (heroRef.current) ro.observe(heroRef.current);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % BACKGROUND_IMAGES.length;
      setNextImageIndex(nextIndex);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  function getAlignedBackgroundStyle(src) {
    const dims = imageDims[src];
    if (!dims || !geometry) {
      return {
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    const { heroWidth, heroHeight, boxLeft, boxTop } = geometry;
    const scale = Math.max(heroWidth / dims.width, heroHeight / dims.height);
    const renderedW = dims.width * scale;
    const renderedH = dims.height * scale;
    const offsetXInHero = (heroWidth - renderedW) / 2;
    const offsetYInHero = (heroHeight - renderedH) / 2;
    return {
      backgroundImage: `url(${src})`,
      backgroundSize: `${renderedW}px ${renderedH}px`,
      backgroundPosition: `${offsetXInHero - boxLeft}px ${offsetYInHero - boxTop}px`,
      backgroundRepeat: "no-repeat",
    };
  }

  const currentSrc = BACKGROUND_IMAGES[currentImageIndex];
  const nextSrc = BACKGROUND_IMAGES[nextImageIndex];

  return (
    <div className="relative bg-black">
      <div className="absolute top-0 right-0 left-0 z-10 h-[25vh] bg-linear-to-b from-black to-transparent" />
      <div
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        {/* Current image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${currentSrc})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            transition: "opacity 1s ease-in-out",
            opacity: 1,
            zIndex: 0,
          }}
        />
        {/* Next image for crossfade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${nextSrc})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            transition: "opacity 1s ease-in-out",
            opacity: isTransitioning ? 1 : 0,
            zIndex: 1,
          }}
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div ref={boxRef} className="relative">
            <h1
              aria-hidden="true"
              className="invisible select-none text-center text-[2rem] md:text-[4rem] lg:text-[6rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-tight tracking-tight px-8 lg:px-16 border-2 border-transparent"
            >
              LIGHTSHOWS
            </h1>

            {/* Inverted fill - current */}
            <div
              className="absolute inset-0"
              style={{
                ...getAlignedBackgroundStyle(currentSrc),
                filter: "invert(1)",
                transition: "opacity 1s ease-in-out",
                opacity: 1,
              }}
            />
            {/* Inverted fill - next (crossfade) */}
            <div
              className="absolute inset-0"
              style={{
                ...getAlignedBackgroundStyle(nextSrc),
                filter: "invert(1)",
                transition: "opacity 1s ease-in-out",
                opacity: isTransitioning ? 1 : 0,
              }}
            />
            {/* Text clip - current */}
            <h1
              className="absolute inset-0 text-center text-[2rem] md:text-[4rem] lg:text-[6rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-tight tracking-tight px-8 lg:px-16"
              style={{
                ...getAlignedBackgroundStyle(currentSrc),
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                transition: "opacity 1s ease-in-out",
                opacity: 1,
              }}
            >
              LIGHTSHOWS
            </h1>
            {/* Text clip - next (crossfade) */}
            <h1
              className="absolute inset-0 text-center text-[2rem] md:text-[4rem] lg:text-[6rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-tight tracking-tight px-8 lg:px-16"
              style={{
                ...getAlignedBackgroundStyle(nextSrc),
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                transition: "opacity 1s ease-in-out",
                opacity: isTransitioning ? 1 : 0,
              }}
            >
              LIGHTSHOWS
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
