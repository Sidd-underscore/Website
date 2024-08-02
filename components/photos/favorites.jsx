import { AdvancedPhoto } from "@/components/photos/photo";
import { useEffect, useState } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useFilters } from "./search-context";
import { Loading } from "../ui/loading";

export function Favorites({ photos }) {
  const [photos1, setPhotos1] = useState(["loading"]);
  const [photos2, setPhotos2] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { filters, setFilters } = useFilters();

  useEffect(() => {
    const listenStorageChange = () => {
      setFavorites(JSON.parse(localStorage.getItem("favoritePhotos")) || []);
    };

    listenStorageChange();

    window.addEventListener("favoritePhotosUpdated", listenStorageChange);
    return () =>
      window.removeEventListener("favoritePhotosUpdated", listenStorageChange);
  }, []);

  useEffect(() => {
    var i;
    var j;

    var tempFavorites = [];
    var tempPhotos1 = [];
    var tempPhotos2 = [];

    for (i = 0; i < photos.length; i++) {
      for (j = 0; j < favorites.length; j++) {
        if (
          photos[i].name === favorites[j].name &&
          photos[i].path === favorites[j].path
        ) {
          tempFavorites.push(photos[i]);
        }
      }
    }

    tempFavorites.forEach((photo, index) => {
      if (index % 2 === 0) {
        tempPhotos1.push(photo);
      } else {
        tempPhotos2.push(photo);
      }
    });

    setPhotos1(tempPhotos1);
    setPhotos2(tempPhotos2);
  }, [photos, favorites]);

  useEffect(() => {
    if (favorites.length > 0 && photos1.length > 0) {
      setIsLoading(false);
    } else if (favorites.length === 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [favorites, photos1]);

  function clearFilters() {
    setFilters({
      camera: undefined,
      location: undefined,
      query: "",
      date: null,
    });
  }

  return (favorites.length > 0 && isLoading === true) ||
    (favorites.length > 0 && photos1.length) > 0 ? (
    <>
      <div className={"mr-2 flex w-1/2 flex-col space-y-4"}>
        {photos1?.map((photo, index) => (
          <AdvancedPhoto
            key={photo.name}
            priority={index < 4 ? true : false}
            className="h-auto"
            photoData={photo}
          />
        ))}
      </div>
      <div className={"ml-2 flex w-1/2 flex-col space-y-4"}>
        {photos2?.map((photo, index) => (
          <AdvancedPhoto
            key={photo.name}
            priority={index < 4 ? true : false}
            className="h-auto"
            photoData={photo}
          />
        ))}
      </div>
    </>
  ) : (
    <div>
      <p className="w-full py-4 text-center text-sm text-neutral-400">
        No favorites found... Add some by clicking on the star icon in the top
        right corner of a photo, or clear some filters.
      </p>

      <p
        onClick={() => {
          clearFilters();
        }}
        className="w-full cursor-pointer text-center text-sm underline"
      >
        Clear all filters
      </p>
    </div>
  );
}
