import originalPhotosArray from "@/lib/photos";
import { Link } from "@/components/ui/link";
import { Photo } from "./photo";
import { useMemo, useState } from "react";

export function Albums({ categories }) {
  const albums = useMemo(() => {
    // Track used photos across all albums
    const globalUsedPhotos = new Set();

    return categories.map((category) => {
      const photosInCategory = originalPhotosArray.filter(
        (photo) => photo.tags && photo.tags.includes(category)
      );

      const previews = [];
      const availablePhotos = photosInCategory.filter(
        (photo) => !globalUsedPhotos.has(photo.name)
      );

      for (let i = 0; i < Math.min(4, photosInCategory.length); i++) {
        let selectedPhoto;
        if (availablePhotos.length > 0) {
          const randomIndex = Math.floor(Math.random() * availablePhotos.length);
          selectedPhoto = availablePhotos.splice(randomIndex, 1)[0];
        } else {
          // If no unique photos, select from all category photos
          const uniqueCategoryPhotos = photosInCategory.filter(
            (photo) => !previews.some(p => p.name === photo.name)
          );
          const randomIndex = Math.floor(Math.random() * uniqueCategoryPhotos.length);
          selectedPhoto = uniqueCategoryPhotos[randomIndex];
        }

        previews.push(selectedPhoto);
        globalUsedPhotos.add(selectedPhoto.name);
      }

      return (
        <AlbumLink
          key={`album-${category}`}
          category={category}
          previewPhotos={previews}
          totalPhotos={photosInCategory.length}
        />
      );
    });
  }, [categories]);

  return (
    <div className="grid grid-cols-2 gap-4 py-4 pt-2 sm:grid-cols-3 md:grid-cols-4">
      {albums}
    </div>
  );
}

function AlbumLink({ category, previewPhotos, totalPhotos }) {
  return (
    <Link
      href={`/photos/albums/${category}`}
      className="group relative aspect-square h-full w-full overflow-hidden rounded-lg border border-neutral-300 bg-neutral-200 !text-black transition hover:border-neutral-400 hover:!text-inherit dark:border-neutral-800 dark:bg-neutral-900 dark:!text-white dark:hover:border-neutral-700"
    >
      <PreviewGrid 
        category={category} 
        photos={previewPhotos} 
      />
      <AlbumInfo category={category} totalPhotos={totalPhotos} />
    </Link>
  );
}

function PreviewGrid({ category, photos }) {
  return (
    <div
      className={`relative grid h-full max-h-full w-full max-w-full  opacity-15 transition group-hover:opacity-25 dark:opacity-25 dark:group-hover:opacity-35 ${
        photos.length === 1
          ? "grid-cols-1 grid-rows-1"
          : photos.length === 2
          ? "grid-cols-2 grid-rows-1"
          : "grid-cols-2 grid-rows-2"
      }`}
    >
      {photos.map((photo, index) => (
        <Photo
          key={`${category}-${photo.name}-${index}`}
          alt=""
          width={150}
          height={150}
          photoData={photo}
          className={`aspect-square h-full w-full rounded-none object-cover ${
            photos.length === 3 && index === 1 
              ? "row-span-2" 
              : ""
          }`}
        />
      ))}
    </div>
  );
}

function AlbumInfo({ category, totalPhotos }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center drop-shadow-lg">
        <p className="text-lg font-semibold capitalize">{category}</p>
        <p className="font-mono text-sm">
          {totalPhotos} photo{totalPhotos > 1 && "s"}
        </p>
      </div>
    </div>
  );
}

export default Albums;