"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useAnimation } from "motion/react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  ChevronLeftIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  CaretSortIcon,
  GlobeIcon,
  ListBulletIcon,
  CheckIcon,
  CameraIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/components/ui/link";

import { cn, useTabs } from "@/lib/utils";
import originalPhotosArray from "@/lib/photos";

import { Albums } from "./albums";
import { PhotoViews, ViewModeToggle } from "./views";
import { PhotoGlobe } from "./photo-globe";
import { Favorites } from "./favorites";
import { useFilters, filterPhotos } from "./search-context";

export function PhotosMain({ params }) {
  const { filters, setFilters } = useFilters();
  const path = usePathname().split("/")[2];
  const router = useRouter();

  const { albumId } = useParams();

  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);

  const [photos1, setPhotos1] = useState();
  const [photos2, setPhotos2] = useState();
  const [fullPhotosArray, setFullPhotosArray] = useState();

  const [everyDateThatsInThePhotosArray, setEveryDateThatsInThePhotosArray] =
    useState([]);
  const [albumCategories, setAlbumCategories] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const [cameras, setCameras] = useState([]);
  const [locations, setLocations] = useState([]);

  const [isInputSticky, setIsInputSticky] = useState(false);
  const controls = useAnimation();

  const { setActiveTab } = useTabs();

  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("gallery");

  const sortPhotos = (photos) => {
    if (!photos) return [];
    return [...photos].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    });
  };

  useEffect(() => {
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

    const uniqueLocations = new Set(
      originalPhotosArray.map((photo) => photo.location),
    );
    setCameras(uniqueCameras);
    setLocations([...uniqueLocations]);
  }, []);

  const filteredPhotos = useMemo(() => {
    // First filter by album if we're in an album view
    let photos = albumId
      ? originalPhotosArray.filter(
          (photo) => photo.tags && photo.tags.includes(albumId),
        )
      : originalPhotosArray;

    return filterPhotos(photos, {
      ...filters,
      location: filters.location,
    });
  }, [originalPhotosArray, filters, albumId]);

  const processedDates = useMemo(() => {
    const tempDates = new Set();
    filteredPhotos.forEach((photo) => {
      tempDates.add(photo.date);
    });
    return Array.from(tempDates);
  }, [filteredPhotos]);

  const processedCategories = useMemo(() => {
    const tagCount = {};
    filteredPhotos.forEach((photo) => {
      photo.tags?.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [filteredPhotos]);

  const applyFilters = useCallback(
    async (data) => {
      const query = data?.query || filters.query;
      const dateQuery =
        data?.filterDate !== undefined ? data.filterDate : filters.date;
      const cameraQuery =
        data?.filterCamera !== undefined ? data.filterCamera : filters.camera;
      const locationQuery =
        data?.filterLocation !== undefined
          ? data.filterLocation
          : filters.location;

      setSearchError(filteredPhotos.length === 0);

      setFilters((prev) => ({
        ...prev,
        camera: cameraQuery,
        location: locationQuery,
        query: query,
        date: dateQuery,
      }));

      setEveryDateThatsInThePhotosArray(processedDates);
      setAlbumCategories(processedCategories);

      const sortedPhotos = sortPhotos(filteredPhotos);
      const [temp1, temp2] = sortedPhotos.reduce(
        ([arr1, arr2], photo, i) => {
          if (i % 2 === 0) {
            arr1.push(photo);
          } else {
            arr2.push(photo);
          }
          return [arr1, arr2];
        },
        [[], []],
      );

      setPhotos1(temp1);
      setPhotos2(temp2);
      setFullPhotosArray(sortedPhotos);
      setSearchIcon(<MagnifyingGlassIcon />);
    },
    [filters, filteredPhotos, processedDates, processedCategories, sortPhotos],
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (filters.query !== undefined) {
        setSearchIcon(<Loading />);
        applyFilters({ query: filters.query });
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filters.query, applyFilters]);

  useEffect(() => {
    if (fullPhotosArray) {
      const sortedPhotos = sortPhotos(fullPhotosArray);

      let anotherTemp1 = [];
      let anotherTemp2 = [];
      sortedPhotos.forEach((photo, index) => {
        if (index % 2 === 0) {
          anotherTemp1.push(photo);
        } else {
          anotherTemp2.push(photo);
        }
      });

      setPhotos1(anotherTemp1);
      setPhotos2(anotherTemp2);
      setFullPhotosArray(sortedPhotos);
    }
  }, [sortOrder]);

  useEffect(() => {
    setSearchIcon(<Loading />);

    const theTimeOut = setTimeout(() => {
      applyFilters({ query: filters.query });
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
    applyFilters({ filterCamera: value });
  };

  const handleLocationChange = (value) => {
    setFilters((prev) => ({ ...prev, location: value }));
    applyFilters({ filterLocation: value });
  };

  const handleDateChange = (newDate) => {
    setSearchIcon(<Loading />);
    const updatedDate =
      newDate === undefined ? "removeSearchDateFilter" : newDate;
    setFilters((prev) => ({ ...prev, date: updatedDate }));
    applyFilters({ filterDate: updatedDate });
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
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
        <div className="flex w-full items-center space-x-2">
          <div className="flex w-full items-center rounded-md border border-neutral-200 bg-white/75 pr-1 pl-3 text-sm shadow-xs backdrop-blur-md transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
            {searchIcon}
            <Input
              onChange={handleSearchChange}
              value={filters.query}
              className="pointer-events-auto border-transparent! ring-0! shadow-none"
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
          <div className="flex items-center space-x-2 rounded-md text-sm">
            <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full rounded-sm bg-white/75 px-3 py-2 font-normal shadow-xs backdrop-blur-md sm:w-30 dark:bg-neutral-950/75">
                <p className="flex items-center space-x-2">
                  <span>
                    {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                  </span>
                </p>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <div className="mt-2 block sm:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters">
            <AccordionTrigger className="py-2 text-sm">
              Filters
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <DatePickerWithRange
                  date={filters.date}
                  setDate={handleDateChange}
                  availableDates={everyDateThatsInThePhotosArray}
                  className="h-auto w-full text-sm shadow-xs"
                />
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
                    <SelectItem value="removeCameraFilter">
                      No filter
                    </SelectItem>
                    {cameras.map((camera) => (
                      <SelectItem key={camera} value={camera}>
                        {camera}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Select
                    value={filters.location || "removeLocationFilter"}
                    onValueChange={handleLocationChange}
                    className="flex-1"
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
                      <SelectItem value="removeLocationFilter">
                        No filter
                      </SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square h-9 w-9"
                      >
                        <GlobeIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-0" align="end">
                      <div className="h-96">
                        <PhotoGlobe
                          onLocationClick={handleLocationChange}
                          showArcs={false}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-2 hidden justify-between space-y-2 sm:flex sm:space-y-0 sm:space-x-2">
        <DatePickerWithRange
          date={filters.date}
          setDate={handleDateChange}
          availableDates={everyDateThatsInThePhotosArray}
          className="h-auto text-sm shadow-xs"
        />
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

        <div className="flex gap-2">
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="aspect-square h-9 w-9"
              >
                <GlobeIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="h-96">
                <PhotoGlobe
                  onLocationClick={handleLocationChange}
                  showArcs={false}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
                <PhotoViews photos={fullPhotosArray} viewMode={viewMode} />
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
