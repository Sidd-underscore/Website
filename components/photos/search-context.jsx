import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

const FILTERS_STORAGE_KEY = "photoFilters";

// Helper to serialize/deserialize dates in filter state
const serializeFilters = (filters) => {
  return {
    ...filters,
    date: filters.date ? {
      from: filters.date.from?.getTime(),
      to: filters.date.to?.getTime()
    } : null
  };
};

const deserializeFilters = (filters) => {
  return {
    ...filters,
    date: filters.date ? {
      from: new Date(filters.date.from),
      to: new Date(filters.date.to)
    } : null
  };
};

export const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (savedFilters) {
      try {
        return deserializeFilters(JSON.parse(savedFilters));
      } catch (e) {
        console.error('Failed to restore filters:', e);
        return {
          camera: undefined,
          location: undefined,
          query: "",
          date: null,
        };
      }
    }
    return {
      camera: undefined,
      location: undefined,
      query: "",
      date: null,
    };
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(serializeFilters(filters)));
  }, [filters]);

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
