"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Photo } from "@/components/photos/photo";
import originalPhotosArray from "@/lib/photos.json";
import { useState, useEffect } from "react";

var temp1 = [];
var temp2 = [];

for (let i = 0; i < originalPhotosArray.length; i += 1) {
  if (i % 2 === 0) {
    temp1.push(originalPhotosArray[i]);
  } else {
    temp2.push(originalPhotosArray[i]);
  }
}

export function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [photos1, setPhotos1] = useState(temp1);
  const [photos2, setPhotos2] = useState(temp2);

  function filterPhotos(photos, query) {
    let anotherTemp1 = [];
    let anotherTemp2 = [];

    for (let i = photos.length - 1; i >= 0; i--) {
      let found = false;
      for (let key in photos[i]) {
        console.log(photos[i][key]);
        if (Array.isArray(photos[i][key])) {
        } else if (typeof photos[i][key] === "number") {
        } else {
          if (photos[i][key].includes(query)) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        photos.splice(i, 1);
      }
    }

    for (let i = 0; i < photos.length; i += 1) {
      if (i % 2 === 0) {
        anotherTemp1.push(photos[i]);
      } else {
        anotherTemp2.push(photos[i]);
      }
    }

    setPhotos1(() => anotherTemp1);
    setPhotos2(() => anotherTemp2);
  }

  useEffect(() => {
    const timeOutId = setTimeout(
      () => filterPhotos([...photos1, ...photos2], searchQuery),
      500,
    );
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <div className="my-6">
      <div className="pointer-events-none flex items-center rounded-lg border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:border-zinc-300 hover:ring-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:ring-zinc-300">
        <MagnifyingGlassIcon />
        <Input
          onChange={(event) => setSearchQuery(event.target.value)}
          className="pointer-events-auto !border-transparent !bg-transparent pr-16 !ring-0"
          placeholder="Search photos... (by name, description, time, date, camera, and more!)"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex w-1/2 flex-col space-y-4">
          {photos1.map((photo) => (
            <Photo key={photo.name} photoData={photo} />
          ))}
        </div>
        <div className="flex w-1/2 flex-col space-y-4">
          {photos2.map((photo) => (
            <Photo key={photo.name} photoData={photo} />
          ))}
        </div>
      </div>
    </div>
  );
}
