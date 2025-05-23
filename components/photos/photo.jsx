"use client";

import Image from "next/image";
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
} from "@/components/ui/responsive-dialog";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, memo, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "motion/react";
import { useIsDesktop } from "@/lib/hooks";

export const Photo = memo(function Photo({ className, photoData, ...props }) {
  if (!photoData || photoData === "loading") return null;

  return (
    <div className={cn("relative w-full")}>
      <Image
        className={cn(
          "h-full w-full max-w-none cursor-pointer rounded-lg transition select-none",
          className,
        )}
        src={photoData.staticPhoto}
        alt={photoData.name}
        width={photoData.staticPhoto.width}
        height={photoData.staticPhoto.height}
        quality={85}
        priority={false}
        placeholder="blur"
        {...props}
      />
    </div>
  );
});

export const AdvancedPhoto = memo(function AdvancedPhoto({
  className,
  photoData,
  priority,
  ...props
}) {
  if (!photoData || photoData === "loading") return null;

  const [photoIsInLocalStorage, setPhotoIsInLocalStorage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkFavorites = () => {
      const favorites =
        JSON.parse(localStorage.getItem("favoritePhotos")) || [];
      const isInFavorites = favorites.some(
        (favorite) => favorite.name === photoData.name,
      );
      setPhotoIsInLocalStorage(isInFavorites);
    };

    checkFavorites();
    window.addEventListener("favoritePhotosUpdated", checkFavorites);
    return () =>
      window.removeEventListener("favoritePhotosUpdated", checkFavorites);
  }, [photoData.name]);

  const handleFavoriteClick = useCallback(() => {
    if (typeof window === "undefined") return;

    const favorites = JSON.parse(localStorage.getItem("favoritePhotos")) || [];
    const isFavorite = favorites.some(
      (favorite) =>
        favorite.name === photoData.name && favorite.path === photoData.path,
    );

    if (!isFavorite) {
      localStorage.setItem(
        "favoritePhotos",
        JSON.stringify([
          ...favorites,
          { name: photoData.name, path: photoData.path },
        ]),
      );
      setPhotoIsInLocalStorage(true);
    } else {
      localStorage.setItem(
        "favoritePhotos",
        JSON.stringify(
          favorites.filter(
            (favorite) =>
              favorite.name !== photoData.name ||
              favorite.path !== photoData.path,
          ),
        ),
      );
      setPhotoIsInLocalStorage(false);
    }
    window.dispatchEvent(new Event("favoritePhotosUpdated"));
  }, [photoData.name, photoData.path]);

  return (
    <Dialog key={photoData.name}>
      <motion.div
        initial="initial"
        whileHover="hover"
        whileFocus="hover"
        className="group relative w-full overflow-hidden"
      >
        <DialogTrigger asChild={true}>
          <div className="relative">
            <Image
              className={cn(
                "h-full w-full max-w-none cursor-pointer rounded-lg transition select-none",
                className,
              )}
              src={photoData.staticPhoto}
              alt={photoData.name}
              width={photoData.staticPhoto.width}
              height={photoData.staticPhoto.height}
              quality={50}
              priority={priority || false}
              placeholder="blur"
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
          onClick={handleFavoriteClick}
          title={
            photoIsInLocalStorage
              ? "Remove photo from favorites"
              : "Add photo to favorites"
          }
        >
          <StarFilledIcon
            className={`h-7 w-7 drop-shadow-sm ${photoIsInLocalStorage ? "stroke-amber-500 text-amber-200" : "stroke-neutral-500 text-neutral-50"}`}
          />
        </motion.div>
      </motion.div>
      <DialogContent className="max-w-fit">
        <PhotoDialog photoData={photoData} />
      </DialogContent>
    </Dialog>
  );
});

function PhotoDialog({ photoData, className }) {
  const isPhotoPortrait =
    photoData.staticPhoto.height > photoData.staticPhoto.width;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-2 flex items-center justify-center space-x-2 sm:justify-start">
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
              sideOffset={20}
              className="m-2 w-[calc(100vw_-_1rem)] md:m-0 md:w-auto md:max-w-[300px]"
            >
              <div>{photoData.description}</div>

              <div className="mt-4 flex items-center space-x-2 text-xs">
                <CalendarIcon className="size-4 shrink-0" />
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

              <div className="mt-2 mb-4 flex items-center space-x-2 text-xs">
                <BookmarkIcon className="h-3 w-3 shrink-0" />
                <span className="flex items-center justify-center md:justify-normal">
                  {photoData.tags.map((tag, index) => (
                    <span
                      className="mr-1.5 rounded-full bg-neutral-100 px-2 py-0.5 text-nowrap transition dark:bg-neutral-700/50"
                      key={tag + index}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>

              <a
                download={true}
                href={photoData.path}
                className={buttonVariants({
                  variant: "outline",
                  className: "flex w-full items-center rounded-lg text-sm",
                })}
              >
                <DownloadIcon className="mr-2 shrink-0" />
                Download full resolution photo
              </a>
            </PopoverContent>
          </Popover>
        </DialogTitle>
        <DialogDescription>
          <div className="flex w-full justify-center overflow-hidden">
            {/* This is such a mess, but it works */}
            <div
              style={{
                aspectRatio: `${photoData.staticPhoto.width} / ${photoData.staticPhoto.height}`,
              }}
              className={`not-sm:h-[revert]! not-sm:w-[85vw]! ${
                isPhotoPortrait
                  ? `sm:h-[calc(var(--container-2xl)-calc(var(--spacing)*24))] md:h-[calc(var(--container-3xl)-calc(var(--spacing)*24))] lg:h-[calc(var(--container-4xl)-calc(var(--spacing)*24))] xl:h-[calc(var(--container-5xl)-calc(var(--spacing)*24))] 2xl:h-[calc(var(--container-7xl)-calc(var(--spacing)*24))]`
                  : "h-full max-h-full w-max sm:w-[calc(var(--container-xl)-calc(var(--spacing)*12))] md:w-[calc(var(--container-2xl)-calc(var(--spacing)*12))] lg:w-[calc(var(--container-3xl)-calc(var(--spacing)*12))] xl:w-[calc(var(--container-4xl)-calc(var(--spacing)*12))] 2xl:w-[calc(var(--container-6xl)-calc(var(--spacing)*12))]"
              }`}
            >
              <Image
                className={cn(`rounded-md select-none`, className)}
                src={photoData.staticPhoto}
                alt={photoData.name}
                height={photoData.staticPhoto.height}
                width={photoData.staticPhoto.width}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                placeholder="blur"
                quality={100}
                priority={true}
              />
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}

export { PhotoDialog, Dialog, DialogContent, DialogTrigger };
