"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useAnimation } from "motion/react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  Cross2Icon,
  MagnifyingGlassIcon,
  GlobeIcon,
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
import { cn } from "@/lib/utils";
import { PhotoViews, ViewModeToggle, NoPhotosFound } from "./views";
import { PhotoGlobe } from "./photo-globe";
import { Albums } from "./albums";
import { Favorites } from "./favorites";
import { useFilters, filterPhotos } from "./search-context";
import originalPhotosArray from "@/lib/photos";
import { useTabs } from "@/lib/utils";

export function PhotosMain() {
  const { filters, setFilters } = useFilters();
  const path = usePathname().split("/")[2];
  const router = useRouter();

  const { albumId } = useParams();

  const [searchIcon, setSearchIcon] = useState(<MagnifyingGlassIcon />);

  const [photos1, setPhotos1] = useState([]);
  const [photos2, setPhotos2] = useState([]);
  const [fullPhotosArray, setFullPhotosArray] = useState([]);

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

  useEffect(() => {
    // Try to restore previous view mode preference from localStorage
    if (typeof window !== "undefined") {
      const savedViewMode = localStorage.getItem("photoViewMode");
      if (savedViewMode) {
        setViewMode(savedViewMode);
      }
    }
  }, []);

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("photoViewMode", newMode);
    }
  };

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

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
    [
      filters,
      filteredPhotos,
      processedDates,
      processedCategories,
      sortPhotos,
      setFilters,
    ],
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

  useEffect(() => {
    setSearchIcon(<Loading />);
    // Call applyFilters immediately on mount to populate the photos
    applyFilters({ query: filters.query });
  }, []);

  const clearFilters = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("photoFilters");
    }
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
      <motion.div
        className={`sticky z-20 ${isInputSticky ? "-mx-4 pt-14 lg:pt-18 lg:mx-4 shadow-lg" : ""}`}
        initial={{ top: "-100%" }}
        animate={controls}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className={`flex w-full items-center ${isInputSticky ? "space-x-1" : "space-x-2"}`}
        >
          <div className="flex w-full items-center rounded-md border border-neutral-200 bg-white/75 pr-1 pl-3 text-sm shadow-xs backdrop-blur-md transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
            <span className="text-neutral-500 dark:text-neutral-400">
              {searchIcon}
            </span>
            <Input
              onChange={handleSearchChange}
              value={filters.query}
              className="pointer-events-auto border-transparent! shadow-none ring-0!"
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
            <div className={`flex items-center space-x-1 rounded-md text-sm`}>
              <ViewModeToggle
                viewMode={viewMode}
                onChange={handleViewModeChange}
              />
              <Select value={sortOrder} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full border-neutral-200 bg-white/75 backdrop-blur-md hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 sm:w-30 dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
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
          )}
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
                      "h-auto w-full",
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

                <div className="flex items-center">
                  <Select
                    value={filters.location || "removeLocationFilter"}
                    onValueChange={handleLocationChange}
                  >
                    <SelectTrigger
                      className={cn(
                        "-mr-0.5 h-10 w-full rounded-r-none",
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
                        className="aspect-square h-10 w-10 rounded-l-none"
                        title="Select a location on the globe"
                      >
                        <GlobeIcon className="size-4" />
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
              "h-auto w-full",
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
              "-mr-0.5 h-10 w-full rounded-r-none",
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
              className="aspect-square h-10 w-10 rounded-l-none"
              title="Select a location on the globe"
            >
              <GlobeIcon className="size-4" />
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
                <NoPhotosFound
                  hasFilters={true}
                  onClearFilters={clearFilters}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="albums">
            <div className="flex w-full justify-center gap-4 py-4 pt-2">
              {searchError === false ? (
                <Albums categories={albumCategories} viewMode={viewMode} />
              ) : (
                <NoPhotosFound
                  hasFilters={true}
                  onClearFilters={clearFilters}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="flex w-full justify-center py-4 pt-2">
              {searchError === false ? (
                <Favorites
                  photos={(photos1 || []).concat(photos2 || [])}
                  viewMode={viewMode}
                  clearFilters={clearFilters}
                />
              ) : (
                <NoPhotosFound
                  hasFilters={true}
                  onClearFilters={clearFilters}
                  message="No favorites match your current filters."
                />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
