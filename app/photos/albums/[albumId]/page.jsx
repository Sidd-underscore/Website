import { PhotosMain } from "@/components/photos/main";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import originalPhotosArray from "@/lib/photos";

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const { albumId } = params;

  return {
    title:
      albumId.charAt(0).toUpperCase() +
      albumId.slice(1) +
      " / Albums / Photography",
  };
}

export default async function AlbumPage(props) {
  const params = await props.params;
  const { albumId } = params;

  return (
    <>
      <p className="-mt-6 mb-2 leading-1 text-sm flex items-center space-x-2">
        <Link href="/photos/albums" className="group flex items-center">
          <ChevronLeftIcon />
          <span className="transition-all group-hover:ml-1 group-focus:ml-1">
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
              totalCount + " photo" + (totalCount > 1 ? "s" : "") + " in album"
            );
          })()}
        </span>
      </p>
      <h1 className="text-5xl font-bold">
        Album: {albumId.charAt(0).toUpperCase() + albumId.slice(1)}
      </h1>

      <PhotosMain />
    </>
  );
}
