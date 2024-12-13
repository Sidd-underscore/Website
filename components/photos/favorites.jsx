import { AdvancedPhoto } from "@/components/photos/photo";
import { useEffect, useState } from "react";

export function Favorites({ photos }) {
  const [photos1, setPhotos1] = useState([]);
  const [photos2, setPhotos2] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    var tempFavorites = [];
    var tempPhotos1 = [];
    var tempPhotos2 = [];

    for (const photo of photos) {
      if (favorites.some(fav => fav.name === photo.name && fav.path === photo.path)) {
        tempFavorites.push(photo);
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

  if (isLoading || favorites.length === 0) {
    return null;
  }

  return (
    <div className="flex">
      <div className="mr-2 flex w-1/2 flex-col space-y-4">
        {photos1?.map((photo, index) => (
          <div key={`${photo.name}-1`}>
            <AdvancedPhoto
              priority={index < 4 ? "true" : "false"}
              className="h-auto"
              photoData={photo}
            />
          </div>
        ))}
      </div>
      <div className="ml-2 flex w-1/2 flex-col space-y-4">
        {photos2?.map((photo, index) => (
          <div key={`${photo.name}-2`}>
            <AdvancedPhoto
              priority={index < 4 ? "true" : "false"}
              className="h-auto"
              photoData={photo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}