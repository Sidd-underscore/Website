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
} from "../ui/responsive-dialog";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { Button, buttonVariants } from "../ui/button";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import { useEffect, useState, memo, useCallback } from "react";
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

export const Photo = memo(function Photo({ className, photoData, ...props }) {
  const { theme } = useTheme();
  const [hasImageFinishedLoading, setHasImageFinishedLoading] = useState(false);

  const handleImageLoad = useCallback(() => {
    setHasImageFinishedLoading(true);
  }, []);

  return (
    <div className={cn("relative w-full")}>
      {!hasImageFinishedLoading && (
        <div
          className={cn(
            "h-full w-full max-w-none cursor-pointer rounded-lg select-none",
            className,
          )}
          style={{
            background: `url('data:image/svg+xml;base64,${toBase64(
              shimmer(
                photoData.staticPhoto.width,
                photoData.staticPhoto.height,
                theme,
              ),
            )}')`,
            aspectRatio: `${photoData.staticPhoto.width} / ${photoData.staticPhoto.height}`,
          }}
        />
      )}
      <Image
        className={cn(
          "h-full w-full max-w-none cursor-pointer rounded-lg transition select-none",
          hasImageFinishedLoading ? "opacity-100" : "opacity-0",
          className,
        )}
        src={photoData.path}
        alt={photoData.name}
        width={photoData.staticPhoto.width}
        height={photoData.staticPhoto.height}
        quality={85}
        priority={false}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
});

export const AdvancedPhoto = memo(function AdvancedPhoto({
  className,
  photoData,
  ...props
}) {
  const { theme } = useTheme();
  const [photoIsInLocalStorage, setPhotoIsInLocalStorage] = useState(false);
  const [hasImageFinishedLoading, setHasImageFinishedLoading] = useState(false);

  useEffect(() => {
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

  const handleImageLoad = useCallback(() => {
    setHasImageFinishedLoading(true);
  }, []);

  const handleFavoriteClick = useCallback(() => {
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

  if (photoData === "loading") return null;

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
            {!hasImageFinishedLoading && (
              <div
                className={cn(
                  "h-full w-full max-w-none rounded-lg select-none",
                  className,
                )}
                style={{
                  background: `url('data:image/svg+xml;base64,${toBase64(
                    shimmer(
                      photoData.staticPhoto.width,
                      photoData.staticPhoto.height,
                      theme,
                    ),
                  )}')`,
                  aspectRatio: `${photoData.staticPhoto.width} / ${photoData.staticPhoto.height}`,
                }}
              />
            )}
            <Image
              className={cn(
                "h-full w-full max-w-none cursor-pointer rounded-lg transition select-none",
                hasImageFinishedLoading ? "opacity-100" : "opacity-0",
                className,
              )}
              src={photoData.path}
              alt={photoData.name}
              width={photoData.staticPhoto.width}
              height={photoData.staticPhoto.height}
              quality={75}
              priority={false}
              onLoad={handleImageLoad}
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
      <DialogContent className="md:max-w-[90vw]!">
        <PhotoDialog photoData={photoData} />
      </DialogContent>
    </Dialog>
  );
});

function PhotoDialog({ photoData, className }) {
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
                    className="w-fit border-none pr-0! pl-2! text-xs! shadow-none"
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
            <Image
              className={cn(
                `${photoData.staticPhoto.width > photoData.staticPhoto.height ? "max-h-[80vh]" : "max-h-[75vh]"} w-auto max-w-[calc(36rem-8rem)] sm:max-w-[calc(36rem-4rem)] md:max-w-[calc(90vw-6rem)] 2xl:max-w-[calc(90vw-12rem)] rounded-md select-none`,
                className,
              )}
              src={photoData.path}
              alt={photoData.name}
              width={photoData.staticPhoto.width}
              height={photoData.staticPhoto.height}
              quality={100}
              priority={true}
            />
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}

export { PhotoDialog, Dialog, DialogContent, DialogTrigger };
