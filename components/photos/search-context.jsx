import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    camera: undefined,
    location: undefined,
    query: "",
    date: null,
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(SearchContext);
};

export const filterPhotos = (
  photos,
  { camera: cameraQuery, location: locationQuery, query, date },
) => {
  if (!photos) return [];

  return photos.filter((photo) => {
    // Check date filter
    if (date && date !== "removeSearchDateFilter") {
      const photoDate = new Date(photo.date * 1000);
      const { from, to } = date;
      if (from && to) {
        const withinRange = photoDate >= from && photoDate <= to;
        const comparableByFrom =
          !from || photoDate.toDateString() === from.toDateString();
        const comparableByTo =
          !to || photoDate.toDateString() === to.toDateString();
        if (!withinRange && !comparableByFrom && !comparableByTo) return false;
      }
    }

    // Check camera filter
    if (cameraQuery && cameraQuery !== "removeCameraFilter") {
      if (!cameraQuery.includes(photo.camera)) return false;
    }

    // Check location filter
    if (locationQuery && locationQuery !== "removeLocationFilter") {
      if (locationQuery === "Galapagos Islands, Ecuador") {
        if (!photo.location.includes("Galapagos Islands")) return false;
      } else {
        if (photo.location !== locationQuery) return false;
      }
    }

    // Check text search
    if (query) {
      const searchFields = [
        photo.name,
        photo.description,
        photo.location,
        photo.camera,
        ...(photo.tags || []),
      ];

      const searchText = searchFields.join(" ").toLowerCase();
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      if (!searchTerms.every((term) => searchText.includes(term))) return false;
    }

    return true;
  });
};
