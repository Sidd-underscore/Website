import originalPhotosArray from "@/lib/photos";
import { Link } from "@/components/ui/link";
import { Photo } from "./photo";
import { useMemo, useState, useEffect } from "react";
import { PhotoViews } from "./views";

export function Albums({ categories, viewMode }) {
  const albumPreviews = useMemo(() => {
    const globalUsedPhotos = new Set();

    return categories.map((category) => {
      const photosInCategory = originalPhotosArray.filter(
        (photo) => photo.tags && photo.tags.includes(category),
      );

      const previews = [];
      const availablePhotos = photosInCategory.filter(
        (photo) => !globalUsedPhotos.has(photo.name),
      );

      for (let i = 0; i < Math.min(4, photosInCategory.length); i++) {
        let selectedPhoto;
        if (availablePhotos.length > 0) {
          const index = Math.abs(
            (category.length + i + previews.length) % availablePhotos.length,
          );
          selectedPhoto = availablePhotos.splice(index, 1)[0];
        } else {
          const uniqueCategoryPhotos = photosInCategory.filter(
            (photo) => !previews.some((p) => p.name === photo.name),
          );
          const index = Math.abs(
            (category.length + i) % uniqueCategoryPhotos.length,
          );
          selectedPhoto = uniqueCategoryPhotos[index];
        }

        previews.push(selectedPhoto);
        globalUsedPhotos.add(selectedPhoto.name);
      }

      return {
        category,
        previews,
        total: photosInCategory.length,
      };
    });
  }, [categories]);

  // If we're in an album view (i.e., viewing photos in an album), use PhotoViews
  if (categories.length === 1) {
    const photosInCategory = originalPhotosArray.filter(
      (photo) => photo.tags && photo.tags.includes(categories[0])
    );
    return <PhotoViews photos={photosInCategory} viewMode={viewMode} />;
  }

  // Otherwise show the album grid
  return (
    <div className="grid grid-cols-2 gap-4 py-4 pt-2 sm:grid-cols-3 md:grid-cols-4">
      {albumPreviews.map(({ category, previews, total }) => (
        <AlbumLink
          key={`album-${category}`}
          category={category}
          previewPhotos={previews}
          totalPhotos={total}
        />
      ))}
    </div>
  );
}

function AlbumLink({ category, previewPhotos, totalPhotos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const hoverDuration = 3000;

  useEffect(() => {
    if (!isHovering || previewPhotos.length <= 1) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % previewPhotos.length;
        if (next === 0) {
          setIsResetting(true);
          setTimeout(() => setIsResetting(false), 50);
        }
        return next;
      });
    }, hoverDuration);

    return () => clearInterval(interval);
  }, [isHovering, previewPhotos.length]);

  if (!previewPhotos?.length) return null;

  if (previewPhotos.length === 1) {
    return (
      <Link
        href={`/photos/albums/${category}`}
        className="group relative aspect-square"
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Photo
            alt=""
            width={400}
            height={400}
            photoData={previewPhotos[0]}
            className="aspect-square h-full w-full object-cover transition-all hoverDuration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="text-white">
              <h3 className="text-lg font-medium capitalize">{category}</h3>
              <p className="text-sm font-light">1 photo</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/photos/albums/${category}`}
      className="group relative aspect-square"
      onMouseEnter={() => {
        setIsHovering(true);
        setIsResetting(false);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentIndex(0);
        setIsResetting(false);
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Photo
          alt=""
          width={400}
          height={400}
          photoData={previewPhotos[currentIndex]}
          className="aspect-square h-full w-full object-cover transition-all hoverDuration-500 group-hover:scale-105"
        />

        <div className="absolute top-2 right-2 left-2 z-10 flex gap-1">
          {previewPhotos.map((_, index) => (
            <div
              key={index}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
            >
              <div
                className="absolute inset-0 bg-white transition-transform hoverDuration-300"
                style={{
                  transform: isResetting
                    ? "scaleX(0)"
                    : `scaleX(${
                        index < currentIndex ||
                        (index === currentIndex && isHovering)
                          ? 1
                          : 0
                      })`,
                  transitionDuration: isResetting
                    ? "0ms"
                    : index === currentIndex && isHovering
                      ? `${hoverDuration}ms`
                      : "300ms",
                  transformOrigin: "left",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-white">
            <h3 className="text-lg font-medium capitalize">{category}</h3>
            <p className="text-sm font-light">
              {totalPhotos} photo{totalPhotos > 1 && "s"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Albums;
