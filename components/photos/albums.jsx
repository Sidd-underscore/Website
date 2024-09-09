import originalPhotosArray from "@/lib/photos";
import { Link } from "@/components/ui/link";
import { Photo } from "./photo";

export function Albums({ categories }) {
  // Local variable to keep track of photos already used in album previews
  let usedPhotos = [];

  const albums = categories.map((category) => {
    // Filter photos that belong to the current category
    const photosInCategory = originalPhotosArray.filter(
      (photo) => photo.tags && photo.tags.includes(category),
    );

    const previews = [];
    const localUsedPhotos = [...usedPhotos]; // Use an array instead of Set

    // Filter out photos that have already been used in other album previews
    const availablePhotos = photosInCategory.filter(
      (photo) => !localUsedPhotos.includes(photo.name),
    );

    // Select up to 4 photos for the preview
    for (let i = 0; i < 4 && i < photosInCategory.length; i++) {
      if (availablePhotos.length > 0) {
        // If there are unused photos, select a random one
        const randomIndex = Math.floor(Math.random() * availablePhotos.length);
        const selectedPhoto = availablePhotos.splice(randomIndex, 1)[0];
        previews.push(selectedPhoto);
        // Mark the selected photo as used in the local array
        localUsedPhotos.push(selectedPhoto.name);
      } else {
        // If all photos in this category have been used, select a random one from the category
        const randomIndex = Math.floor(Math.random() * photosInCategory.length);
        previews.push(photosInCategory[randomIndex]);
      }
    }

    // Update the usedPhotos variable
    usedPhotos = localUsedPhotos;

    return (
      <AlbumLink
        key={category}
        category={category}
        previewPhotos={previews}
        totalPhotos={photosInCategory.length}
      />
    );
  });

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
      <PreviewGrid photos={previewPhotos} />
      <AlbumInfo category={category} totalPhotos={totalPhotos} />
    </Link>
  );
}

function PreviewGrid({ photos }) {
  return (
    <div
      className={`relative grid h-full max-h-full w-full max-w-full gap-1 p-1 opacity-15 transition group-hover:opacity-25 dark:opacity-25 dark:group-hover:opacity-35 ${
        photos.length === 1
          ? "grid-cols-1 grid-rows-1"
          : photos.length === 2
            ? "grid-cols-2 grid-rows-1"
            : "grid-cols-2 grid-rows-2"
      }`}
    >
      {photos.map((photo, index) => (
        <Photo
          key={index}
          priority={true}
          quality={50}
          src={photo.staticPhoto}
          alt=""
          width={150}
          height={150}
          photoData={{ staticPhoto: photo.staticPhoto }}
          className={`aspect-square h-full w-full rounded-none object-cover ${photos.length === 3 && index === 2 ? "col-span-2" : ""} ${index === 0 ? "rounded-tl-md" : index === 1 ? "rounded-tr-md" : index === 2 ? "rounded-bl-md" : "rounded-br-md"}`}
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
        <p className="font-mono text-sm">{totalPhotos} photos</p>
      </div>
    </div>
  );
}
