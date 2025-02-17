"use client";

import { ViewHorizontalIcon, RowsIcon, ImageIcon } from "@radix-ui/react-icons";
import { GalleryView } from "./gallery-view";
import { ListView } from "./list-view";
import { CarouselView } from "./carousel-view";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PhotoViews = ({ photos, viewMode }) => {
  const views = {
    gallery: <GalleryView photos={photos} />,
    list: <ListView photos={photos} />,
    carousel: <CarouselView photos={photos} />,
  };

  return views[viewMode] || views.gallery;
};

export const ViewModeToggle = ({ viewMode, onChange }) => {
  return (
    <ToggleGroup
      value={viewMode}
      onValueChange={onChange}
      type="single"
      className="flex h-9 items-center rounded-md border border-neutral-200 bg-white/75 backdrop-blur-md p-1 text-sm shadow-xs hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950/75 dark:hover:border-neutral-700"
    >
      <ToggleGroupItem
        value="gallery"
        className="h-6 w-6 rounded-sm p-0!"
        title="Gallery view"
      >
        <ViewHorizontalIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        className="h-6 w-6 rounded-sm p-0!"
        title="List view"
      >
        <RowsIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="carousel"
        className="h-6 w-6 rounded-sm p-0!"
        title="Carousel view"
      >
        <ImageIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
