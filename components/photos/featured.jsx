"use client";

import originalPhotosArray from "@/lib/photos";
import { Photo } from "./photo";
import { Link } from "../ui/link";
import { useEffect, useState } from "react";
import { PhotoGallery } from "../ui/photo-gallery";

export function FeaturedPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let result = [];
    let trueResult = [];
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
      trueResult.push(
        <Photo className="h-96 w-fit max-w-none" photoData={photo} />,
      );
    });
    trueResult.push(
      <Link
        href="/photos"
        className="flex h-96 min-w-[289.13px] items-center justify-center rounded-lg border bg-neutral-200 dark:bg-neutral-900"
      >
        <div className="text-center text-2xl font-bold">View all</div>
      </Link>,
    );
    setPhotos(trueResult);
  }, []);

  return (
    <div className="my-32 w-full text-left">
      <h2 className="text-4xl font-semibold">Featured Photos</h2>

      <PhotoGallery
        photos={photos}
        photoComponent={({ photoData }) => (
          <Photo className="h-96 w-fit max-w-none" photoData={photoData} />
        )}
      />
    </div>
  );
}
