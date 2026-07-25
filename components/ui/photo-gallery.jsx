"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export function PhotoGallery({ photos }) {
  const gallery = useRef(null);
  const photosRef = useRef([]);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  useEffect(() => {
    photosRef.current = photosRef.current.slice(0, photos.length);
  }, [photos.length]);

  const updateVisibleImage = useCallback(() => {
    if (!gallery.current || photos.length === 0) return;

    const scrollLeft = gallery.current.scrollLeft;
    const imageWidth = photosRef.current[0]?.offsetWidth || 0;
    const padding = 32;

    const index = Math.floor(scrollLeft / (imageWidth + padding));
    setVisibleImageIndex(Math.max(0, Math.min(index, photos.length - 1)));
  }, [photos.length]);

  useEffect(() => {
    updateVisibleImage();
  }, [updateVisibleImage]);

  function scrollLeft() {
    if (!gallery.current) return;
    const imageWidth = photosRef.current[visibleImageIndex]?.offsetWidth || 0;
    gallery.current.scrollBy({
      left: imageWidth + 16,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!gallery.current) return;
    const imageWidth = photosRef.current[visibleImageIndex]?.offsetWidth || 0;
    gallery.current.scrollBy({
      left: -(imageWidth + 16),
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div
        ref={gallery}
        onScroll={updateVisibleImage}
        className="mx-0.5 mt-4 flex max-w-screen gap-4 overflow-x-auto"
      >
        {photos.map((photo, index) => (
          <span ref={(el) => (photosRef.current[index] = el)} key={index}>
            {photo}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between m-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollRight}
        >
          <span className="sr-only">Scroll left</span>
          <ArrowLeftIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollLeft}
        >
          <span className="sr-only">Scroll right</span>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
