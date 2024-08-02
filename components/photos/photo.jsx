"use client";

import {
  CalendarIcon,
  CameraIcon,
  CropIcon,
  DownloadIcon,
  InfoCircledIcon,
  SewingPinFilledIcon,
  StarFilledIcon,
  StarIcon,
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
import Image from "next/image";
import { cn } from "@/lib/utils";
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
import { useIsDesktop } from "@/lib/hooks";
import { motion } from "framer-motion";

export function Photo({ className, photoData, width, height, ...props }) {
  const [photoHasLoaded, setPhotoHasLoaded] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      {!photoHasLoaded && (
        <div
          className={cn(
            "max-h-full max-w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-900",
            className,
          )}
          style={{
            width: photoData.staticPhoto.width,
            aspectRatio:
              photoData.staticPhoto.width / photoData.staticPhoto.height,
          }}
        />
      )}
      <Image
        quality={50}
        className={cn(
          "h-full w-full max-w-none cursor-pointer rounded-lg select-none",
          photoHasLoaded ? "inherit" : "hidden",
          className,
        )}
        src={photoData.staticPhoto}
        onLoad={() => setPhotoHasLoaded(true)}
        alt={photoData.name || ""}
        title={photoData.name || ""}
        width={width || 0}
        height={height || 0}
        {...props}
      />
    </div>
  );
}

export function AdvancedPhoto({ className, photoData, ...props }) {
  const [photoHasLoaded, setPhotoHasLoaded] = useState(false);
  const [photoIsInLocalStorage, setPhotoIsInLocalStorage] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritePhotos")) || [];

    var i;
    for (i = 0; i < favorites.length; i++) {
      if (favorites[i].name === photoData.name) {
        return setPhotoIsInLocalStorage(true);
      }
    }
  }, [photoData]);

  return (
    <>
      <Dialog key={photoData.name}>
        <motion.div
          initial="initial"
          whileHover="animate"
          className="group relative w-full overflow-hidden"
        >
          <DialogTrigger asChild={true}>
            <div>
              {/* Loader for the image before it has loaded */}
              {!photoHasLoaded && (
                <div
                  className={`max-h-full max-w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-900`}
                  style={{
                    width: photoData.staticPhoto.width,
                    aspectRatio:
                      photoData.staticPhoto.width /
                      photoData.staticPhoto.height,
                  }}
                />
              )}
              <Image
                quality={50}
                className={cn(
                  "h-full w-full max-w-none cursor-pointer select-none rounded-lg",
                  photoHasLoaded ? "inherit" : "hidden",
                  className,
                )}
                src={photoData.staticPhoto}
                onLoad={() => setPhotoHasLoaded(true)}
                alt={photoData.name}
                title={photoData.name}
                width={0}
                height={0}
                {...props}
              />
            </div>
          </DialogTrigger>
          <motion.div
            transition={{ duration: 0.2 }}
            className="absolute right-2 top-2 cursor-pointer transition hover:!opacity-100"
            variants={{
              animate: { opacity: 0.75 },
              initial: { opacity: 0 },
            }}
            onClick={() => {
              const favorites =
                JSON.parse(localStorage.getItem("favoritePhotos")) || [];

              const isFavorite = favorites.some(favorite => favorite.name === photoData.name && favorite.path === photoData.path);

              if (!isFavorite) {
                favorites.push({name: photoData.name, path: photoData.path});
                localStorage.setItem(
                  "favoritePhotos",
                  JSON.stringify(favorites),
                );
                setPhotoIsInLocalStorage(true);
                window.dispatchEvent(new Event("favoritePhotosUpdated"));
              } else {
                // Remove photo from favorites if it's already there
                const updatedFavorites = favorites.filter(favorite => favorite.name !== photoData.name || favorite.path !== photoData.path);
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
              className={`h-6 w-6 ${photoIsInLocalStorage ? "stroke-pink-500 text-pink-200" : "stroke-neutral-500 text-neutral-50"}`}
            />
          </motion.div>
        </motion.div>
        <DialogContent className="!max-w-[90vw]">
          <PhotoDialog photoData={photoData} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function PhotoDialog({ photoData }) {
  const [downloadFormat, setDownloadFormat] = useState(".png");
  const [photoPreviewHasLoaded, setPhotoPreviewHasLoaded] = useState(false);

  const isDesktop = useIsDesktop();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-2 items-center space-y-2 md:flex md:space-y-0">
          <span className="mr-2">{photoData.name}</span>{" "}
          <div className="flex items-center justify-center md:justify-normal">
            {photoData.tags.map((tag, index) => (
              <span
                className="mx-1 text-nowrap rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-xs font-light transition dark:bg-neutral-700/50"
                key={tag + index}
              >
                {tag}
              </span>
            ))}
          </div>
        </DialogTitle>
        <DialogDescription>
          <div className="relative w-full max-w-[90vw] overflow-auto">
            <div className="relative flex max-h-full max-w-full items-center justify-center space-y-2 overflow-auto p-1 md:space-y-0">
              {!photoPreviewHasLoaded && (
                <div
                  className={`flex max-h-full w-full animate-pulse items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-900`}
                  style={
                    photoData.staticPhoto.height > photoData.staticPhoto.width
                      ? {
                          height:
                            photoData.staticPhoto.height /
                            (photoData.staticPhoto.width < 3071
                              ? isDesktop
                                ? 4
                                : 10
                              : isDesktop
                                ? 6
                                : 12),
                          aspectRatio:
                            photoData.staticPhoto.width /
                            photoData.staticPhoto.height,
                        }
                      : {
                          width:
                            photoData.staticPhoto.width /
                            (photoData.staticPhoto.width < 3071
                              ? isDesktop
                                ? 4
                                : 10
                              : isDesktop
                                ? 6
                                : 12),
                          aspectRatio:
                            photoData.staticPhoto.width /
                            photoData.staticPhoto.height,
                        }
                  }
                >
                  Loading high-res photo...
                </div>
              )}

              <Image
                className={`${photoPreviewHasLoaded ? "inherit" : "hidden"} select-none h-auto w-auto max-w-none rounded-lg`}
                src={photoData.staticPhoto}
                alt={photoData.name}
                title={photoData.name}
                onLoad={() => setPhotoPreviewHasLoaded(true)}
                width={0}
                height={0}
                quality={100}
                priority={true}
                style={
                  photoData.staticPhoto.height > photoData.staticPhoto.width
                    ? {
                        height:
                          photoData.staticPhoto.height /
                          (photoData.staticPhoto.width < 3071
                            ? isDesktop
                              ? 4
                              : 10
                            : isDesktop
                              ? 6
                              : 12),
                      }
                    : {
                        width:
                          photoData.staticPhoto.width /
                          (photoData.staticPhoto.width < 3071
                            ? isDesktop
                              ? 4
                              : 10
                            : isDesktop
                              ? 6
                              : 12),
                      }
                }
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className="absolute right-4 top-4 flex aspect-square h-auto w-auto items-center justify-center rounded-full p-2 backdrop-blur-sm"
                    size="icon"
                  >
                    <InfoCircledIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={12}
                  className="max-w-[300px]"
                >
                  <div>{photoData.description}</div>

                  <div className="mt-4 flex items-center space-x-2 text-xs">
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span>
                      {formatRelative(fromUnixTime(photoData.date), Date.now())}{" "}
                      at {format(fromUnixTime(photoData.date), "h:mm a")} (
                      {formatDistance(
                        fromUnixTime(photoData.date),
                        Date.now(),
                        {
                          addSuffix: true,
                        },
                      )}
                      )
                    </span>
                  </div>

                  <div className="mt-2 flex items-center space-x-2 text-xs">
                    <SewingPinFilledIcon className="h-3 w-3 shrink-0" />
                    <span>{photoData.location}</span>
                  </div>

                  <div className="mb-4 mt-2 flex items-center space-x-2 text-xs">
                    <CameraIcon className="h-3 w-3 shrink-0" />
                    <span>{photoData.camera}</span>
                  </div>

                  <div className="mb-4 mt-2 flex items-center space-x-2 text-xs">
                    <CropIcon className="h-3 w-3 shrink-0" />
                    <span>
                      {photoData.staticPhoto.width} x{" "}
                      {photoData.staticPhoto.height}
                    </span>
                  </div>

                  <a
                    download={true}
                    href={photoData.path.replace(".png", downloadFormat)}
                    className={buttonVariants({
                      variant: "outline",
                      size: "md",
                      className:
                        "mt-2 flex w-full items-center rounded-lg text-sm",
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
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}
