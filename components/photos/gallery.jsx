"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Photo } from "@/components/photos/photo";
import originalPhotosArray from "@/lib/photos.json";
import { useState, useEffect } from "react";
import { Loading } from "../ui/loading";
import { until } from "@/lib/utils";
import { DatePickerWithRange } from "../ui/date-picker";

export function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);
  const [photos1, setPhotos1] = useState();
  const [photos2, setPhotos2] = useState();
  const [searchError, setSearchError] = useState(false);
  const [date, setDate] = useState();
  const [imagesLoading, setImagesLoading] = useState(
    originalPhotosArray.length,
  );

  async function filterPhotos(data) {
    let photos = [...originalPhotosArray];
    let query = data?.searchQuery || searchQuery;
    let dateQuery = data?.filterDate;

    let anotherTemp1 = [];
    let anotherTemp2 = [];

    var doneWithDateFiltering = false;
    var doneWithSearching = false;
    var doneWithArrays = false;

    // Check whether there is a query in the first place
    if (!dateQuery && query === "") {
      doneWithDateFiltering = true;
      doneWithSearching = true;
      photos = [...originalPhotosArray];
    } else {
      // First, remove photos outside of date range if it exists
      if (dateQuery) {
        let filteredPhotos = photos.filter((photo) => {
          let photoDate = new Date(photo.date * 1000);
          let from = dateQuery.from ? new Date(dateQuery.from) : undefined;
          let to = dateQuery.to ? new Date(dateQuery.to) : undefined;

          let withinRange = photoDate >= from && photoDate <= to;
          let comparableByFrom =
            !from || photoDate.toDateString() === from.toDateString();
          let comparableByTo =
            !to || photoDate.toDateString() === to.toDateString();

          return withinRange || (comparableByFrom && comparableByTo);
        });

        photos = filteredPhotos;
        doneWithDateFiltering = true;
      } else {
        photos = [...originalPhotosArray];
        doneWithDateFiltering = true;
      }

      await until((_) => doneWithDateFiltering === true);

      // Then, search for text matches
      for (let i = photos.length - 1; i >= 0; i--) {
        let found = false;
        for (let key in photos[i]) {
          if (Array.isArray(photos[i][key])) {
            for (let againAKey in photos[i][key]) {
              if (photos[i][key][againAKey].toLowerCase().includes(query)) {
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
    setImagesLoading(() => photos.length);
  }

  // when searchQuery changes, wait a bit for typing to stop then filter
  useEffect(() => {
    setSearchIcon(<Loading />);

    const timeOutId = setTimeout(() => {
      filterPhotos({ searchQuery: searchQuery, filterDate: date });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <div className="my-6">
      <div className="w-full items-center space-y-2 md:flex md:space-x-2 md:space-y-0">
        <div className="pointer-events-none flex w-full items-center rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:border-zinc-300 hover:ring-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:ring-zinc-300">
          {searchIcon}
          <Input
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pointer-events-auto !border-transparent !bg-transparent pr-16 shadow-none !ring-0"
            placeholder="Search photos... (by name, description, camera, and more!)"
          />
        </div>
        <DatePickerWithRange
          date={date}
          setDate={(e) => {
            setSearchIcon(<Loading />);
            setDate(e);
            filterPhotos({ searchQuery: searchQuery, filterDate: e });
          }}
          className="h-auto px-3 py-3 text-sm shadow-sm"
        />
      </div>

      <div className="mt-4 flex w-full gap-4 p-4">
        {searchError === false ? (
          <>
            <div
              className={
                imagesLoading === 0 ? "flex w-1/2 flex-col space-y-4" : "hidden"
              }
            >
              {photos1?.map((photo) => (
                <Photo
                  onLoad={() => setImagesLoading((prev) => prev - 1)}
                  key={photo.name}
                  photoData={photo}
                />
              ))}
            </div>
            <div
              className={
                imagesLoading === 0 ? "flex w-1/2 flex-col space-y-4" : "hidden"
              }
            >
              {photos2?.map((photo) => (
                <Photo
                  onLoad={() => setImagesLoading((prev) => prev - 1)}
                  key={photo.name}
                  photoData={photo}
                />
              ))}
            </div>

            {imagesLoading != 0 && (
              <p className="flex h-full w-full items-center justify-center space-x-2 py-4 text-center text-sm text-zinc-400">
                <Loading />{" "}
                <span>Loading images... ({imagesLoading} left)</span>
              </p>
            )}
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
