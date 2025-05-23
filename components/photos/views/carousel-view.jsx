"use client";

import { useState, useRef, memo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AdvancedPhoto } from "@/components/photos/photo";

const variants = {
  enter: () => ({
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: () => ({
    zIndex: 0,
    opacity: 0,
    scale: 0.8,
  }),
};

function Thumbnail({ photo, isCurrent, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex-shrink-0 overflow-hidden rounded-md transition-all ${
        isCurrent
          ? "size-14"
          : "size-10 hover:ring-2 hover:ring-neutral-900 dark:hover:ring-white"
      }`}
      data-current={isCurrent}
      layout
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.img
        src={photo?.path}
        alt={photo?.name}
        className="h-full w-full object-cover"
        layoutId={`thumb-${photo?.path}`}
      />
    </motion.button>
  );
}

export function CarouselView({ photos }) {
  if (!photos?.length) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setHasOverflow(container.scrollWidth > container.clientWidth);
    }
  }, [photos]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const currentThumb = container.children[currentIndex];
      if (currentThumb) {
        currentThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[110vw] w-full">
      <motion.div
        className="relative aspect-square w-full overflow-hidden rounded-lg"
        whileHover="hover"
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
            className="absolute inset-0 h-full w-full"
          >
            <AdvancedPhoto
              photoData={photos[currentIndex]}
              className="aspect-square rounded-lg object-cover"
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={photos?.length <= 1}
        >
          <ArrowLeftIcon className="h-full w-4" />
        </Button>

        <div className="flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className={`flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-2 ${
              hasOverflow ? "justify-start" : "justify-center"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {photos.map((photo, index) => (
              <div key={photo?.path} className="flex-shrink-0 snap-center">
                <Thumbnail
                  photo={photo}
                  isCurrent={index === currentIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newDirection = index > currentIndex ? 1 : -1;
                    setDirection(newDirection);
                    setCurrentIndex(index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={photos?.length <= 1}
        >
          <ArrowRightIcon className="h-full w-4" />
        </Button>
      </div>
    </div>
  );
}
