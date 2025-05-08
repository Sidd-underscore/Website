"use client";

import { ViewHorizontalIcon, RowsIcon, ImageIcon } from "@radix-ui/react-icons";
import { GalleryView } from "./gallery-view";
import { ListView } from "./list-view";
import { CarouselView } from "./carousel-view";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PhotoViews = ({ photos, viewMode }) => {
  if (!photos) {
    return null;
  }

  const views = {
    gallery: <GalleryView photos={photos} />,
    list: <ListView photos={photos} />,
    carousel: <CarouselView photos={photos} />,
  };

  return views[viewMode] || views.gallery;
};

export const ViewModeToggle = ({ viewMode, onChange }) => {
  const handleClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const modes = ["gallery", "list", "carousel"];
      const currentIndex = modes.indexOf(viewMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      onChange(modes[nextIndex]);
    }
  };

  const icons = {
    gallery: <ViewHorizontalIcon />,
    list: <RowsIcon />,
    carousel: <ImageIcon />,
  };

  return (
    <ToggleGroup
      value={viewMode}
      onValueChange={onChange}
      type="single"
      className="flex h-9 w-9 items-center rounded-md border border-neutral-200 bg-white/75 shadow-xs backdrop-blur-md hover:border-neutral-300 sm:w-auto dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700"
      onClick={handleClick}
    >
      <div className="block sm:hidden">
        <ToggleGroupItem
          value={viewMode}
          className="h-9 w-9 rounded-md bg-transparent! p-0!"
          title={`Click to change view. Currently ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} but can be one of Gallery, List, or Carousel.`}
        >
          {icons[viewMode]}
        </ToggleGroupItem>
      </div>

      <div className="hidden sm:flex">
        {Object.entries(icons).map(([key, icon]) => (
          <ToggleGroupItem
            key={key}
            value={key}
            className={`h-8.5 w-8.5 ${Object.keys(icons).indexOf(key) == 0 ? "rounded-l-[calc(var(--radius)_-_3px)] rounded-r-none" : Object.keys(icons).indexOf(key) == 1 ? "rounded-none" : "rounded-l-none rounded-r-[calc(var(--radius)_-_3px)]"} p-0!`}
            title={`${key.charAt(0).toUpperCase() + key.slice(1)} view`}
          >
            {icon}
          </ToggleGroupItem>
        ))}
      </div>
    </ToggleGroup>
  );
};

export const NoPhotosFound = ({ hasFilters, onClearFilters, message }) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-neutral-400">
        {message ||
          (hasFilters
            ? "No photos found... Try clearing some search filters?"
            : "No photos found in this section.")}
      </p>
      {hasFilters && (
        <p
          onClick={onClearFilters}
          className="mt-2 cursor-pointer text-sm text-neutral-400 underline"
        >
          Clear all filters
        </p>
      )}
    </div>
  );
};
