import { AdvancedPhoto } from "@/components/photos/photo";
import Masonry from "react-masonry-css";

export function GalleryView({ photos }) {
  return (
    <Masonry
      breakpointCols={3}
      className="-ml-4 flex w-auto"
      columnClassName="pl-4 [background-clip:padding-box]"
    >
      {photos?.map((photo) => (
        <AdvancedPhoto
          key={photo.name}
          priority="true"
          className="mb-4 h-auto"
          photoData={photo}
        />
      ))}
    </Masonry>
  );
}
