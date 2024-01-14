"use client";

import originalPhotosArray from "@/lib/photos";
import { Photo } from "./photo";
import { Link } from "../ui/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export function FeaturedPhotos() {
  const gallery = useRef(null);
  const [photos, setPhotos] = useState([]);

  function scrollLeft() {
    if (!gallery.current) return false;
    gallery.current.scrollTo({
      left: gallery.current.scrollLeft + 305.12,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!gallery.current) return false;
    gallery.current.scrollTo({
      left: gallery.current.scrollLeft - 305.12,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    let result = [];
    let arr = [...originalPhotosArray];

    const len = arr.length;
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * len);
      if (result.includes(arr[randomIndex])) {
        i -= 1;
      } else {
        result.push(arr[randomIndex]);
      }
    }
    setPhotos(result);
  }, [originalPhotosArray]);

  return (
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Featured Photos</h2>

      <div
        ref={gallery}
        className="mx-0.5 mt-12 flex space-x-4 overflow-x-auto py-2"
      >
        {photos.map((photo, index) => (
          <Photo
            key={index}
            className="h-96 w-fit max-w-none"
            photoData={photo}
          />
        ))}

        <Link
          href="/photos"
          className="flex h-96 min-w-48 items-center justify-center rounded-lg border bg-zinc-200 dark:bg-zinc-900"
        >
          <div className="text-center text-2xl font-bold">View all</div>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        {" "}
        <Button variant="icon" size="icon" onClick={(e) => scrollRight()}>
          <ArrowLeftIcon />
        </Button>
        <Button variant="icon" size="icon" onClick={(e) => scrollLeft()}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
