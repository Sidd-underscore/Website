"use client";

import originalPhotosArray from "@/lib/photos";
import { AdvancedPhoto } from "./photo";
import { Link } from "../ui/link";
import { useEffect, useState } from "react";
import { PhotoGallery } from "../ui/photo-gallery";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export function FeaturedPhotos() {
  const [photos, setPhotos] = useState([]);

  function getPhotos() {
    let result = [];
    let tempPhotos = [];
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

    result.forEach((photo) => {
      tempPhotos.push(
        <AdvancedPhoto
          className="h-96 w-fit max-w-none"
          priority="true"
          photoData={photo}
        />,
      );
    });

    tempPhotos.push(
      <Link
        href="/photos/gallery"
        className="flex h-96 min-w-[289.13px] items-center justify-center rounded-lg border border-neutral-400/50 bg-neutral-300/40 backdrop-blur-md dark:border-neutral-700/50 dark:bg-neutral-800/40"
      >
        <div className="text-center text-2xl font-bold">View all</div>
      </Link>,
    );

    setPhotos(tempPhotos);
  }
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="my-32 w-full text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">Featured Photos</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => getPhotos()}
          title="Refresh photos"
        >
          <UpdateIcon />
        </Button>
      </div>

      <PhotoGallery photos={photos} />
    </div>
  );
}
