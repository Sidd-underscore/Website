"use client";

import {
  ChevronLeftIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import originalPhotosArray from "@/lib/photos";
import { useState, useEffect, useCallback } from "react"; // Import useCallback
import { Loading } from "../ui/loading";
import { cn, useTabs } from "@/lib/utils";
import { DatePickerWithRange } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CameraIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Albums } from "./albums";
import { Gallery } from "./gallery";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useFilters } from "./search-context";
import { Favorites } from "./favorites";
import { useParams } from "next/navigation";
import { Link } from "../ui/link";

export function PhotosMain({ params }) {
  const { filters, setFilters } = useFilters();
  const path = usePathname().split("/")[2];
  const router = useRouter();

  const { albumId } = useParams();

  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);
  const [photos1, setPhotos1] = useState();
  const [photos2, setPhotos2] = useState();
  const [everyDateThatsInThePhotosArray, setEveryDateThatsInThePhotosArray] =
    useState([]);
  const [albumCategories, setAlbumCategories] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const [cameras, setCameras] = useState([]);
  const [locations, setLocations] = useState([]);

  const [isInputSticky, setIsInputSticky] = useState(false);
  const controls = useAnimation();

  const { setActiveTab } = useTabs();

  useEffect(() => {
    // ensure that the correct tab is active
    setActiveTab(albumId ? "gallery" : path);
  }, [albumId, setActiveTab, path]);

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

  useEffect(() => {
    const uniqueCameras = [
      ...new Set(originalPhotosArray.map((photo) => photo.camera)),
    ];
    const uniqueLocations = [
      ...new Set(originalPhotosArray.map((photo) => photo.location)),
    ];
    setCameras(uniqueCameras);
    setLocations(uniqueLocations);
  }, []);

  const filterPhotos = useCallback(
    async (data) => {
      let photos = [...originalPhotosArray];
      let query = data?.query || filters.query;
      let dateQuery =
        data?.filterDate !== undefined ? data.filterDate : filters.date;
      let cameraQuery =
        data?.filterCamera !== undefined ? data.filterCamera : filters.camera;
      let locationQuery =
        data?.filterLocation !== undefined
          ? data.filterLocation
          : filters.location;

      // First and foremost, remove photos that are not in the album if an album is selected
      if (albumId) {
        photos = photos.filter((photo) => photo.tags.includes(albumId));
      }

      // Ensure that if filters are cleared, they are treated as empty
      if (!dateQuery && !cameraQuery && !locationQuery && query === "") {
        photos = [...originalPhotosArray]; // No filters applied

        // Do the album filtering again
        if (albumId) {
          photos = photos.filter((photo) => photo.tags.includes(albumId));
        }
      } else {
        // First, remove photos outside of date range if it exists
        if (dateQuery && dateQuery !== "removeSearchDateFilter") {
          photos = photos.filter((photo) => {
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
        }

        // Next, filter out unwanted cameras
        if (cameraQuery && cameraQuery !== "removeCameraFilter") {
          photos = photos.filter((photo) => cameraQuery.includes(photo.camera));
        }

        // Next, filter out unwanted locations
        if (locationQuery && locationQuery !== "removeLocationFilter") {
          photos = photos.filter((photo) =>
            locationQuery.includes(photo.location),
          );
        }

        // Then, search for text matches
        if (query) {
          photos = photos.filter((photo) => {
            for (let key in photo) {
              if (Array.isArray(photo[key])) {
                if (
                  photo[key].some((item) =>
                    item.toLowerCase().includes(query.toLowerCase()),
                  )
                ) {
                  return true;
                }
              } else if (
                typeof photo[key] === "string" &&
                photo[key].toLowerCase().includes(query.toLowerCase())
              ) {
                return true;
              }
            }
            return false;
          });
        }
      }

      setSearchError(photos.length === 0);

      setFilters((prev) => ({
        ...prev,
        camera: cameraQuery,
        location: locationQuery,
        query: query,
        date: dateQuery,
      }));

      let tempDates = [];
      originalPhotosArray.forEach((photo) => {
        // if an album is selected, only add dates from photos that are in that album
        if (albumId) {
          if (photo.tags.includes(albumId)) {
            let photoDate = new Date(photo.date * 1000);
            const dateWithoutTime = new Date(
              photoDate.getFullYear(),
              photoDate.getMonth(),
              photoDate.getDate(),
            );
            const dateString = dateWithoutTime.toISOString().split("T")[0];
            if (!tempDates.includes(dateString)) {
              tempDates.push(photo.date);
            }
          }
        } else {
          let photoDate = new Date(photo.date * 1000);
          const dateWithoutTime = new Date(
            photoDate.getFullYear(),
            photoDate.getMonth(),
            photoDate.getDate(),
          );
          const dateString = dateWithoutTime.toISOString().split("T")[0];
          if (!tempDates.includes(dateString)) {
            tempDates.push(photo.date);
          }
        }
      });

      setEveryDateThatsInThePhotosArray(tempDates);

      // Find the 10 most common tags associated with the photos and add each one to the albumCategories array
      let tempAlbumCategoriesCounts = {};
      photos.forEach((photo) => {
        if (photo.tags) {
          photo.tags.forEach((tag) => {
            tempAlbumCategoriesCounts[tag] =
              (tempAlbumCategoriesCounts[tag] || 0) + 1;
          });
        }
      });

      const sortedTags = Object.entries(tempAlbumCategoriesCounts).sort(
        (a, b) => b[1] - a[1],
      );
      setAlbumCategories(sortedTags.map((tag) => tag[0]));

      let anotherTemp1 = [];
      let anotherTemp2 = [];
      photos.forEach((photo, index) => {
        if (index % 2 === 0) {
          anotherTemp1.push(photo);
        } else {
          anotherTemp2.push(photo);
        }
      });

      setPhotos1(anotherTemp1);
      setPhotos2(anotherTemp2);
      setSearchIcon(<MagnifyingGlassIcon />);
    },
    [filters, setFilters, albumId],
  );

  // when query changes, wait a bit for typing to stop then filter
  useEffect(() => {
    setSearchIcon(<Loading />);

    const theTimeOut = setTimeout(() => {
      // Only call filterPhotos if the query has changed
      filterPhotos({ query: filters.query });
    }, 500);
    return () => clearTimeout(theTimeOut);
  }, [filters.query]);

  const clearFilters = () => {
    setFilters({
      camera: undefined,
      location: undefined,
      query: "",
      date: null,
    });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, query: value }));
  };

  const handleCameraChange = (value) => {
    setFilters((prev) => ({ ...prev, camera: value }));
    filterPhotos({ filterCamera: value });
  };

  const handleLocationChange = (value) => {
    setFilters((prev) => ({ ...prev, location: value }));
    filterPhotos({ filterLocation: value });
  };

  const handleDateChange = (newDate) => {
    setSearchIcon(<Loading />);
    const updatedDate =
      newDate === undefined ? "removeSearchDateFilter" : newDate;
    setFilters((prev) => ({ ...prev, date: updatedDate }));
    filterPhotos({ filterDate: updatedDate });
  };

  return (
    <div className="my-6">
      {albumId && (
        <p className="mb-4 flex items-center space-x-2">
          <Link href="/photos/albums" className="group flex items-center">
            <ChevronLeftIcon />
            <span className="text-base transition-all group-hover:ml-1 group-focus:ml-1">
              Go back
            </span>
          </Link>
          <span>•</span>
          <span>
            {(function () {
              var totalCount = 0;
              originalPhotosArray.forEach((photo) => {
                if (photo.tags.includes(albumId)) {
                  totalCount += 1;
                }
              });
              return (
                totalCount +
                " photo" +
                (totalCount > 1 ? "s" : "") +
                " in album"
              );
            })()}
          </span>
        </p>
      )}
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
              onChange={handleSearchChange}
              value={filters.query}
              className="pointer-events-auto !border-transparent pr-16 shadow-none !ring-0"
              placeholder="Search photos... (by name, description, camera, and more!)"
            />
            <Button
              variant="icon"
              className="z-20 aspect-square border-none p-0 text-neutral-400 hover:text-inherit"
              onClick={clearFilters}
              title="Clear all search filters"
            >
              <Cross2Icon />
            </Button>
          </div>
          {!isInputSticky && (
            <DatePickerWithRange
              date={filters.date}
              setDate={handleDateChange}
              availableDates={everyDateThatsInThePhotosArray}
              className="h-auto text-sm shadow-sm md:px-3 md:py-3"
            />
          )}
        </div>
      </motion.div>
      <div className="mt-2 justify-between space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
        <Select
          value={filters.camera || "removeCameraFilter"}
          onValueChange={handleCameraChange}
        >
          <SelectTrigger
            className={cn(
              "h-auto w-full px-3 py-2 font-normal",
              (filters.camera === undefined ||
                filters.camera === "removeCameraFilter") &&
                "text-neutral-400",
            )}
          >
            <p className="flex items-center space-x-2">
              <CameraIcon className="h-3 w-3" />
              <span>
                {filters.camera === undefined ||
                filters.camera === "removeCameraFilter"
                  ? "Select a camera..."
                  : filters.camera}
              </span>
            </p>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="removeCameraFilter">No filter</SelectItem>
            {cameras.map((camera) => (
              <SelectItem key={camera} value={camera}>
                {camera}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.location || "removeLocationFilter"}
          onValueChange={handleLocationChange}
        >
          <SelectTrigger
            className={cn(
              "h-auto w-full px-3 py-2 font-normal",
              (filters.location === undefined ||
                filters.location === "removeLocationFilter") &&
                "text-neutral-400",
            )}
          >
            <p className="flex items-center space-x-2">
              <SewingPinFilledIcon className="h-3 w-3" />
              <span>
                {filters.location === undefined ||
                filters.location === "removeLocationFilter"
                  ? "Select a location..."
                  : filters.location}
              </span>
            </p>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="removeLocationFilter">No filter</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={albumId ? "gallery" : path}
        defaultValue={albumId ? "gallery" : path}
        className="mt-6 w-full"
      >
        {!albumId && (
          <TabsList className="w-full">
            <TabsTrigger
              className="w-1/3"
              value="gallery"
              onClick={(e) => {
                router.push("/photos/gallery", undefined, {
                  shallow: true,
                });
              }}
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              className="w-1/3"
              value="albums"
              onClick={(e) => {
                router.push("/photos/albums", undefined, {
                  shallow: true,
                });
              }}
            >
              Albums
            </TabsTrigger>
            <TabsTrigger
              className="w-1/3"
              value="favorites"
              onClick={(e) => {
                router.push("/photos/favorites", undefined, {
                  shallow: true,
                });
              }}
            >
              Favorites
            </TabsTrigger>
          </TabsList>
        )}
        <div className="">
          <TabsContent value="gallery">
            <div className="flex w-full justify-center gap-4 py-4 pt-2">
              {searchError === false ? (
                <Gallery photos1={photos1} photos2={photos2} />
              ) : (
                <div>
                  <p className="w-full py-4 text-center text-sm text-neutral-400">
                    No photos found... Try clearing some search filters?
                  </p>
                  <p
                    onClick={clearFilters}
                    className="w-full cursor-pointer text-center text-sm underline"
                  >
                    Clear all filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="albums">
            <div className="flex w-full justify-center gap-4 py-4 pt-2">
              {searchError === false ? (
                <Albums categories={albumCategories} />
              ) : (
                <div>
                  <p className="w-full py-4 text-center text-sm text-neutral-400">
                    No photos found... Try clearing some search filters?
                  </p>
                  <p
                    onClick={clearFilters}
                    className="w-full cursor-pointer text-center text-sm underline"
                  >
                    Clear all filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="flex w-full justify-center py-4 pt-2">
              {searchError === false ? (
                <Favorites photos={(photos1 || []).concat(photos2 || [])} />
              ) : (
                <div>
                  <p className="w-full py-4 text-center text-sm text-neutral-400">
                    No favorites found... Add some by clicking on the star icon
                    in the top right corner of a photo, or clear some filters.
                  </p>
                  <p
                    onClick={clearFilters}
                    className="w-full cursor-pointer text-center text-sm underline"
                  >
                    Clear all filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
