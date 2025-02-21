"use client";

import Image from "next/image";
import {
  PhotoDialog,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/photos/photo";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { useCallback, useState, useEffect } from "react";

export function ListView({ photos }) {
  if (!photos?.length) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      {photos.map((photo, index) => (
        <ListViewItem
          key={`${photo.path}-${photo.date}-${index}`}
          photo={photo}
        />
      ))}
    </div>
  );
}

function ListViewItem({ photo }) {
  const [photoIsInLocalStorage, setPhotoIsInLocalStorage] = useState(false);

  useEffect(() => {
    const checkFavorites = () => {
      const favorites =
        JSON.parse(localStorage.getItem("favoritePhotos")) || [];
      const isInFavorites = favorites.some(
        (favorite) =>
          favorite.name === photo.name && favorite.path === photo.path,
      );
      setPhotoIsInLocalStorage(isInFavorites);
    };

    checkFavorites();
    window.addEventListener("favoritePhotosUpdated", checkFavorites);
    return () =>
      window.removeEventListener("favoritePhotosUpdated", checkFavorites);
  }, [photo.name, photo.path]);

  const handleFavoriteClick = useCallback(
    (e) => {
      e.stopPropagation();
      const favorites =
        JSON.parse(localStorage.getItem("favoritePhotos")) || [];
      const isFavorite = favorites.some(
        (favorite) =>
          favorite.name === photo.name && favorite.path === photo.path,
      );

      if (!isFavorite) {
        localStorage.setItem(
          "favoritePhotos",
          JSON.stringify([
            ...favorites,
            { name: photo.name, path: photo.path },
          ]),
        );
        setPhotoIsInLocalStorage(true);
      } else {
        localStorage.setItem(
          "favoritePhotos",
          JSON.stringify(
            favorites.filter(
              (favorite) =>
                favorite.name !== photo.name || favorite.path !== photo.path,
            ),
          ),
        );
        setPhotoIsInLocalStorage(false);
      }
      window.dispatchEvent(new Event("favoritePhotosUpdated"));
    },
    [photo.name, photo.path],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group flex cursor-pointer items-center justify-between rounded-lg p-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                height={96}
                width={96}
                src={photo.staticPhoto}
                placeholder="blur"
                alt={photo.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{photo.name}</h3>
              <p className="text-sm text-neutral-500">{photo.description}</p>
              <div className="mt-1 text-xs text-neutral-400">
                {photo.camera} •{" "}
                {new Date(photo.date * 1000).toLocaleDateString()}
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0.6, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: photoIsInLocalStorage ? 0.8 : 1.2 }}
            className="ml-4 cursor-pointer self-center"
            onClick={handleFavoriteClick}
            title={
              photoIsInLocalStorage
                ? "Remove photo from favorites"
                : "Add photo to favorites"
            }
          >
            <StarFilledIcon
              className={`h-6 w-6 transition-colors ${photoIsInLocalStorage ? "stroke-amber-500 text-amber-200" : "stroke-neutral-500 text-neutral-50"} `}
            />
          </motion.div>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[90vw]!">
        <PhotoDialog photoData={photo} />
      </DialogContent>
    </Dialog>
  );
}
