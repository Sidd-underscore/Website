import { AdvancedPhoto } from "@/components/photos/photo";
import { useEffect, useState } from "react";
import { PhotoViews, NoPhotosFound } from "./views";
import { useFilters } from "./search-context";

export function Favorites({ photos, viewMode, clearFilters }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filters } = useFilters();

  const hasActiveFilters = () => {
    return (
      filters.query ||
      filters.camera ||
      filters.location ||
      filters.date !== null
    );
  };

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
    if (favorites.length > 0 && photos.length > 0) {
      setIsLoading(false);
    } else if (favorites.length === 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [favorites, photos]);

  if (isLoading) {
    return null;
  }

  const favoritePhotos = photos.filter((photo) =>
    favorites.some((fav) => fav.name === photo.name && fav.path === photo.path),
  );

  if (favorites.length === 0) {
    return (
      <NoPhotosFound 
        message="No favorites yet. Add some by clicking the star icon on any photo!"
        hasFilters={false}
      />
    );
  }

  if (favoritePhotos.length === 0) {
    return (
      <NoPhotosFound 
        hasFilters={hasActiveFilters()}
        onClearFilters={clearFilters}
        message={hasActiveFilters() 
          ? "No favorites match your current filters."
          : "No favorites yet. Add some by clicking the star icon on any photo!"}
      />
    );
  }

  return <PhotoViews photos={favoritePhotos} viewMode={viewMode} />;
}
