"use client";

import { useRef } from "react";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export function PhotoGallery({ photos, scroll = 250 }) {
  const gallery = useRef(null);

  function scrollLeft() {
    if (!gallery.current) return false;
    gallery.current.scrollTo({
      left: gallery.current.scrollLeft + scroll,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!gallery.current) return false;
    gallery.current.scrollTo({
      left: gallery.current.scrollLeft - scroll,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div
        ref={gallery}
        className="mx-0.5 mt-4 flex space-x-4 overflow-x-auto py-2"
      >
        {photos.map((photo, index) => (
          <span key={index}>{photo}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="active:scale-90"
          onClick={(e) => scrollRight()}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="active:scale-90"
          onClick={(e) => scrollLeft()}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
