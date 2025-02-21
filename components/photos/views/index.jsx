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
      className="flex h-9 items-center rounded-md border border-neutral-200 bg-white/75 text-sm shadow-xs backdrop-blur-md hover:border-neutral-300 sm:p-1 dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700"
      onClick={handleClick}
    >
      <div className="block sm:hidden">
        <ToggleGroupItem
          value={viewMode}
          className="h-9 w-9 rounded-sm border p-0! bg-white! text-neutral-900! dark:bg-neutral-950! border-neutral-200! dark:border-neutral-800! dark:text-neutral-50! hover:bg-neutral-100! dark:hover:bg-neutral-800! hover:border-neutral-300! dark:hover:border-neutral-700!"
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
            className="h-7 w-7 rounded-sm p-0!"
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
        {message || (hasFilters 
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
