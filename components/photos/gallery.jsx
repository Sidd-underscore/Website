"use client";

import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Photo } from "@/components/photos/photo";
import originalPhotosArray from "@/lib/photos";
import { useState, useEffect } from "react";
import { Loading } from "../ui/loading";
import { cn, until } from "@/lib/utils";
import { DatePickerWithRange } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CameraIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";
import { Button } from "../ui/button";

export function Gallery() {
  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);

  const [photos1, setPhotos1] = useState();
  const [photos2, setPhotos2] = useState();

  const [searchError, setSearchError] = useState(false);
  const [date, setDate] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const [searchCamera, setSearchCamera] = useState();
  const [cameras, setCameras] = useState([]);

  const [searchLocation, setSearchLocation] = useState();
  const [locations, setLocations] = useState([]);

  const [isInputSticky, setIsInputSticky] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsInputSticky(true);
        controls.start({ top: 0 });
      } else {
        setIsInputSticky(false);
        controls.start({ top: "-100%" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  async function filterPhotos(data) {
    let photos = [...originalPhotosArray];
    let query = data?.searchQuery || searchQuery;
    let dateQuery = data?.filterDate || date;
    let cameraQuery = data?.filterCamera || searchCamera;
    let locationQuery = data?.filterLocation || searchLocation;

    let anotherTemp1 = [];
    let anotherTemp2 = [];

    var doneWithDateFiltering = false;
    var doneWithSearching = false;
    var doneWithArrays = false;
    var doneWithCameraFiltering = false;
    var doneWithLocationFiltering = false;

    // Check whether there is a query in the first place
    if (!dateQuery && !cameraQuery && !locationQuery && query === "") {
      doneWithDateFiltering = true;
      doneWithSearching = true;
      doneWithCameraFiltering = true;
      doneWithLocationFiltering = true;
      photos = [...originalPhotosArray];
    } else {
      // First, remove photos outside of date range if it exists
      if (dateQuery && dateQuery != "removeSearchDateFilter") {
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

      // Next, filter out unwanted cameras
      if (cameraQuery && cameraQuery != "removeSearchCameraFilter") {
        let filteredPhotos = photos.filter((photo) => {
          return cameraQuery.includes(photo.camera);
        });

        photos = filteredPhotos;
        doneWithCameraFiltering = true;
      } else {
        doneWithCameraFiltering = true;
      }

      await until((_) => doneWithCameraFiltering === true);

      // Next, filter out unwanted locations
      if (locationQuery && locationQuery != "removeSearchLocationFilter") {
        let filteredPhotos = photos.filter((photo) => {
          return locationQuery.includes(photo.location);
        });

        photos = filteredPhotos;
        doneWithLocationFiltering = true;
      } else {
        doneWithLocationFiltering = true;
      }

      await until((_) => doneWithLocationFiltering === true);

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
          } else if (
            [
              "blurDataURL",
              "blurHeight",
              "blurWidth",
              "height",
              "src",
              "width",
            ].every((prop) => photos[i][key].hasOwnProperty(prop))
          ) {
            // This is the image static import
            if (i === photos.length - 1) doneWithSearching = true;
            break;
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

    // update the camera and location menus
    var tempCameras = [];
    var tempLocations = [];
    originalPhotosArray.forEach((photo) => {
      const { camera, location } = photo;

      if (!tempCameras.includes(camera)) {
        tempCameras.push(camera);
      }

      if (!tempLocations.includes(location)) {
        tempLocations.push(location);
      }
    });

    setCameras(() => tempCameras);
    setLocations(() => tempLocations);

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

    await until(
      (_) =>
        doneWithSearching === true &&
        doneWithArrays === true &&
        doneWithCameraFiltering === true,
    );
    setSearchIcon(<MagnifyingGlassIcon />);
  }

  // when searchQuery changes, wait a bit for typing to stop then filter
  useEffect(() => {
    setSearchIcon(<Loading />);

    const timeOutId = setTimeout(() => {
      filterPhotos({
        searchQuery: searchQuery,
      });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  function clearFilters() {
    setSearchCamera("");
    setSearchLocation("");
    setSearchQuery("");
    console.log("clearing filters");
    setDate(null);
    filterPhotos({
      searchQuery: "",
      filterDate: null,
      filterCamera: "",
      filterLocation: "",
    });
  }

  return (
    <div className="my-6">
      <motion.div
        className={`sticky z-20 ${isInputSticky ? "mx-4 pt-20 shadow-lg" : ""}`}
        initial={{ top: "-100%" }}
        animate={controls}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full items-center space-y-2 md:flex md:space-x-2 md:space-y-0">
          <div className="flex w-full items-center rounded-md border border-neutral-200 bg-transparent bg-white bg-opacity-90 py-1 pl-3 pr-1 text-sm shadow-sm backdrop-blur-md transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:bg-opacity-75 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
            {searchIcon}
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
              className="pointer-events-auto !border-transparent pr-16 shadow-none !ring-0"
              placeholder="Search photos... (by name, description, camera, and more!)"
            />
            <Button
              variant="icon"
              className="z-20 aspect-square border-none p-0 text-neutral-400 hover:text-inherit"
              onClick={() => clearFilters()}
              title="Clear all search filters"
            >
              <Cross2Icon />
            </Button>
          </div>
          {!isInputSticky && (
            <DatePickerWithRange
              date={date}
              setDate={(e) => {
                setSearchIcon(<Loading />);
                setDate(e === undefined ? "removeSearchDateFilter" : e);
                filterPhotos({
                  filterDate: e === undefined ? "removeSearchDateFilter" : e,
                });
              }}
              className="h-auto text-sm shadow-sm md:px-3 md:py-3"
            />
          )}
        </div>
      </motion.div>
      <div className="mt-2 justify-between space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
        <Select
          defaultValue="removeSearchCameraFilter"
          onValueChange={(e) => {
            e === "removeSearchCameraFilter"
              ? setSearchCamera(undefined)
              : setSearchCamera(e);

            filterPhotos({
              filterCamera: e,
            });
          }}
        >
          <SelectTrigger
            className={cn(
              "h-auto w-full px-3 py-2 font-normal",
              !searchCamera && "text-neutral-400",
            )}
          >
            <p className="flex items-center space-x-2">
              <CameraIcon className="h-3 w-3" />
              <span>
                {searchCamera === undefined ? (
                  "Select a camera..."
                ) : (
                  <SelectValue placeholder="Select a camera..." />
                )}
              </span>
            </p>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="removeSearchCameraFilter">No filter</SelectItem>
            {cameras.map((camera) => (
              <SelectItem key={camera} value={camera}>
                {camera}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue="removeSearchLocationFilter"
          onValueChange={(e) => {
            e === "removeSearchLocationFilter"
              ? setSearchLocation(undefined)
              : setSearchLocation(e);

            filterPhotos({
              filterLocation: e,
            });
          }}
        >
          <SelectTrigger
            className={cn(
              "h-auto w-full px-3 py-2 font-normal",
              !searchLocation && "text-neutral-400",
            )}
          >
            <p className="flex items-center space-x-2">
              <SewingPinFilledIcon className="h-3 w-3" />
              <span>
                {searchLocation === undefined ? (
                  "Select a location..."
                ) : (
                  <SelectValue placeholder="Select a location..." />
                )}
              </span>
            </p>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="removeSearchLocationFilter">
              No filter
            </SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex w-full justify-center gap-4 py-4">
        {searchError === false ? (
          <>
            <div className={"flex w-1/2 flex-col space-y-4"}>
              {photos1?.map((photo, index) => (
                <Photo
                  key={photo.name}
                  priority={index > 4 ? true : false}
                  className="h-auto"
                  photoData={photo}
                />
              ))}
            </div>
            <div className={"flex w-1/2 flex-col space-y-4"}>
              {photos2?.map((photo, index) => (
                <Photo
                  key={photo.name}
                  priority={index > 4 ? true : false}
                  className="h-auto"
                  photoData={photo}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <p className="w-full py-4 text-center text-sm text-neutral-400">
              No photos found... Try clearing some search filters?
            </p>
            <p
              onClick={() => {
                clearFilters();
              }}
              className="w-full cursor-pointer text-center text-sm underline"
            >
              Clear all filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
