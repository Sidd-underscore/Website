"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Photo } from "@/components/photos/photo";
import originalPhotosArray from "@/lib/photos.json";
import { useState, useEffect } from "react";
import { Loading } from "../ui/loading";
import { until } from "@/lib/utils";

var temp1 = [];
var temp2 = [];

function initializePhotos() {
  for (let i = 0; i < originalPhotosArray.length; i += 1) {
    if (i % 2 === 0) {
      temp1.push(originalPhotosArray[i]);
    } else {
      temp2.push(originalPhotosArray[i]);
    }
  }
}

export function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);
  const [photos1, setPhotos1] = useState(temp1);
  const [photos2, setPhotos2] = useState(temp2);
  const [searchError, setSearchError] = useState(false);

  async function filterPhotos() {
    let photos = [...originalPhotosArray];
    let query = searchQuery;

    let anotherTemp1 = [];
    let anotherTemp2 = [];

    var doneWithSearching = false;
    var doneWithArrays = false;

    for (let i = photos.length - 1; i >= 0; i--) {
      let found = false;
      for (let key in photos[i]) {
        if (Array.isArray(photos[i][key])) {
          for (let morekey in photos[i][key]) {
            if (photos[i][key][morekey].toLowerCase().includes(query)) {
              found = true;
              if (i === photos.length - 1) doneWithSearching = true;
              break;
            }
          }
        } else if (typeof photos[i][key] === "number") {
          if (photos[i][key].toString().includes(query)) {
            found = true;
            if (i === photos.length - 1) doneWithSearching = true;
            break;
          }
        } else {
          if (photos[i][key].toLowerCase().includes(query)) {
            found = true;
            if (i === photos.length - 1) doneWithSearching = true;
            break;
          }
        }

        if (i === photos.length - 1) doneWithSearching = true;
      }
      if (!found) {
        photos.splice(i, 1);
      }
    }

    if (photos.length === 0) return setSearchError(true);
    else setSearchError(false);

    for (let i = 0; i < photos.length; i += 1) {
      if (i % 2 === 0) {
        anotherTemp1.push(photos[i]);
      } else {
        anotherTemp2.push(photos[i]);
      }

      if (i === photos.length - 1) doneWithArrays = true;
    }

    setPhotos1(() => anotherTemp1);
    setPhotos2(() => anotherTemp2);

    await until((_) => doneWithSearching === true && doneWithArrays === true);
    setSearchIcon(<MagnifyingGlassIcon />);
  }

  useEffect(() => {
    initializePhotos();
    setSearchIcon(<Loading />);

    const timeOutId = setTimeout(() => {
      console.log("ok");
      filterPhotos();
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <div className="my-6">
      <div className="pointer-events-none flex items-center rounded-lg border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:border-zinc-300 hover:ring-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:ring-zinc-300">
        {searchIcon}
        <Input
          onChange={(event) => setSearchQuery(event.target.value)}
          className="pointer-events-auto !border-transparent !bg-transparent pr-16 !ring-0"
          placeholder="Search photos... (by name, description, time, date, camera, and more!)"
        />
      </div>

      <div className="mt-4 flex w-full gap-4">
        {searchError === false ? (
          <>
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
          </>
        ) : (
          <p className="w-full py-4 text-center text-sm text-zinc-400">
            No photos found... Try clearing some search filters?
          </p>
        )}
      </div>
    </div>
  );
}
