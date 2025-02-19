"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export function PhotoGallery({ photos }) {
  const gallery = useRef(null);
  const photosRef = useRef([]);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  useEffect(() => {
    photosRef.current = photosRef.current.slice(0, photos.length);
  }, [photos]);

  function updateVisibleImage() {
    if (!gallery.current || photos.length === 0) return;

    const scrollLeft = gallery.current.scrollLeft;
    const imageWidth = photosRef.current[0]?.offsetWidth || 0;
    const padding = 32;

    const index = Math.floor(scrollLeft / (imageWidth + padding));
    setVisibleImageIndex(Math.max(0, Math.min(index, photos.length - 1)));
  }

  useEffect(() => {
    updateVisibleImage();
  }, [photos, photosRef.current]);

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
        className="mx-0.5 mt-4 flex max-h-[26rem] space-x-4 overflow-x-auto max-w-screen"
      >
        {photos.map((photo, index) => (
          <span ref={(el) => (photosRef.current[index] = el)} key={index}>
            {photo}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="active:scale-90"
          onClick={scrollRight}
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="active:scale-90"
          onClick={scrollLeft}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
