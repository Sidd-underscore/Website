// -------------
// WARNING FOR NEXTJS FANS
// Im so sorry loyal Nextjs fans, but using next/image simply is taking too long. Please forgive my transgression of using the native <img /> component 🙏🏼🙏🏼
// If you can fix this file to make it nice and performant I will give you a cookie (real)
// -------------

/* eslint @next/next/no-img-element: 0 */

"use client";

import {
  BookmarkIcon,
  CalendarIcon,
  CameraIcon,
  CropIcon,
  DownloadIcon,
  InfoCircledIcon,
  SewingPinFilledIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/responsive-dialog";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { Button, buttonVariants } from "../ui/button";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function Photo({ className, photoData, width, height, ...props }) {
  const { theme } = useTheme();
  const [hasImageFinishedLoading, setHasImageFinishedLoading] = useState(false);

  return (
    <div className={cn("relative w-full")}>
      {!hasImageFinishedLoading && (
        <img
          className={cn(
            "h-full w-full max-w-none cursor-pointer select-none rounded-lg",
            className,
          )}
          src={`data:image/svg+xml;base64,${toBase64(shimmer(photoData.staticPhoto.width, photoData.staticPhoto.height, theme))}`}
          alt={photoData.name}
          title={photoData.name}
          {...props}
        />
      )}
      <img
        className={cn(
          "h-full w-full max-w-none cursor-pointer select-none rounded-lg transition",
          hasImageFinishedLoading ? "opacity-100" : "opacity-0",
          className,
        )}
        src={photoData.path}
        alt={photoData.name}
        title={photoData.name}
        onLoad={() => setHasImageFinishedLoading(true)}
        {...props}
      />
    </div>
  );
}

export function AdvancedPhoto({ className, photoData, ...props }) {
  const { theme } = useTheme();
  const [photoIsInLocalStorage, setPhotoIsInLocalStorage] = useState(false);
  const [hasImageFinishedLoading, setHasImageFinishedLoading] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritePhotos")) || [];

    var i;
    for (i = 0; i < favorites.length; i++) {
      if (favorites[i].name === photoData.name) {
        return setPhotoIsInLocalStorage(true);
      }
    }
  }, [photoData]);

  if (photoData === "loading") return; // TODO: figure out how the heck this happens

  return (
    <>
      <Dialog key={photoData.name}>
        <motion.div
          initial="initial"
          whileHover="hover"
          whileFocus="hover"
          className="group relative w-full overflow-hidden"
        >
          <DialogTrigger asChild={true}>
            <div className="relative">
              {!hasImageFinishedLoading && (
                <img
                  className={cn(
                    "h-full w-full max-w-none cursor-pointer select-none rounded-lg",
                    className,
                  )}
                  src={`data:image/svg+xml;base64,${toBase64(shimmer(photoData.staticPhoto.width, photoData.staticPhoto.height, theme))}`}
                  alt={photoData.name}
                  title={photoData.name}
                  {...props}
                />
              )}
              <img
                className={cn(
                  "h-full w-full max-w-none cursor-pointer select-none rounded-lg transition",
                  hasImageFinishedLoading ? "opacity-100" : "opacity-0",
                  className,
                )}
                src={photoData.path}
                alt={photoData.name}
                title={photoData.name}
                onLoad={() => setHasImageFinishedLoading(true)}
                {...props}
              />
            </div>
          </DialogTrigger>
          <motion.div
            transition={{ duration: 0.2 }}
            className="absolute cursor-pointer"
            variants={{
              hover: { opacity: 100, top: 8, right: 8, scale: 1 },
              initial: { opacity: 0, top: -20, right: -20, scale: 0.5 },
            }}
            whileTap={{ scale: photoIsInLocalStorage ? 0.8 : 1.2 }}
            onClick={() => {
              const favorites =
                JSON.parse(localStorage.getItem("favoritePhotos")) || [];

              const isFavorite = favorites.some(
                (favorite) =>
                  favorite.name === photoData.name &&
                  favorite.path === photoData.path,
              );

              if (!isFavorite) {
                favorites.push({ name: photoData.name, path: photoData.path });
                localStorage.setItem(
                  "favoritePhotos",
                  JSON.stringify(favorites),
                );
                setPhotoIsInLocalStorage(true);
                window.dispatchEvent(new Event("favoritePhotosUpdated"));
              } else {
                // Remove photo from favorites if it's already there
                const updatedFavorites = favorites.filter(
                  (favorite) =>
                    favorite.name !== photoData.name ||
                    favorite.path !== photoData.path,
                );
                localStorage.setItem(
                  "favoritePhotos",
                  JSON.stringify(updatedFavorites),
                );
                setPhotoIsInLocalStorage(false);
                window.dispatchEvent(new Event("favoritePhotosUpdated"));
              }
            }}
            title={
              photoIsInLocalStorage
                ? "Remove photo from favorites"
                : "Add photo to favorites"
            }
          >
            <StarFilledIcon
              className={`h-7 w-7 drop-shadow ${photoIsInLocalStorage ? "stroke-amber-500 text-amber-200" : "stroke-neutral-500 text-neutral-50"}`}
            />
          </motion.div>
        </motion.div>
        <DialogContent className="md:!max-w-[90vw]">
          <PhotoDialog photoData={photoData} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function PhotoDialog({ photoData }) {
  const [downloadFormat, setDownloadFormat] = useState(".png");

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-2 flex items-center justify-center space-x-2 md:justify-start">
          <span>{photoData.name}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-[1.25em] w-[1.25em] items-center justify-center rounded-full p-0"
              >
                <InfoCircledIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              sideOffset={12}
              className="m-2 w-[calc(100vw_-_1rem)] md:m-0 md:w-auto md:max-w-[300px]"
            >
              <div>{photoData.description}</div>

              <div className="mt-4 flex items-center space-x-2 text-xs">
                <CalendarIcon className="h-4 w-4 shrink-0" />
                <span>
                  {formatRelative(fromUnixTime(photoData.date), Date.now())} at{" "}
                  {format(fromUnixTime(photoData.date), "h:mm a")} (
                  {formatDistance(fromUnixTime(photoData.date), Date.now(), {
                    addSuffix: true,
                  })}
                  )
                </span>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-xs">
                <SewingPinFilledIcon className="h-3 w-3 shrink-0" />
                <span>{photoData.location}</span>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-xs">
                <CameraIcon className="h-3 w-3 shrink-0" />
                <span>{photoData.camera}</span>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-xs">
                <CropIcon className="h-3 w-3 shrink-0" />
                <span>
                  {photoData.staticPhoto.width} x {photoData.staticPhoto.height}
                </span>
              </div>

              <div className="mb-4 mt-2 flex items-center space-x-2 text-xs">
                <BookmarkIcon className="h-3 w-3 shrink-0" />
                <span className="flex items-center justify-center md:justify-normal">
                  {photoData.tags.map((tag, index) => (
                    <span
                      className="mr-1.5 text-nowrap rounded-full bg-neutral-100 px-2 py-0.5 transition dark:bg-neutral-700/50"
                      key={tag + index}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>

              <a
                download={true}
                href={photoData.path.replace(".png", downloadFormat)}
                className={buttonVariants({
                  variant: "outline",
                  size: "md",
                  className: "mt-2 flex w-full items-center rounded-lg text-sm",
                })}
              >
                <DownloadIcon className="mr-2 shrink-0" />
                Download as{" "}
                <Select
                  defaultValue={downloadFormat}
                  onValueChange={setDownloadFormat}
                >
                  <SelectTrigger
                    triggerButtonVariant="icon"
                    className="w-fit border-none !pl-2 !pr-0 !text-xs shadow-none"
                  >
                    <SelectValue placeholder="Select an image format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=".png">PNG</SelectItem>
                    <SelectItem value=".jpg">
                      JPG{" "}
                      {photoData.jpgHasMetadata != false && (
                        <span className="text-xs">(metadata)</span>
                      )}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </a>
            </PopoverContent>
          </Popover>
        </DialogTitle>
        <DialogDescription>
          <div className="relative flex max-h-full max-w-full items-center justify-center space-y-2 overflow-auto md:space-y-0">
            <img
              className={`${photoData.staticPhoto.width > photoData.staticPhoto.height ? "max-h-[80vh]" : "max-h-[75vh]"} w-auto select-none rounded-md`}
              src={photoData.path}
              alt={photoData.name}
            />
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}
