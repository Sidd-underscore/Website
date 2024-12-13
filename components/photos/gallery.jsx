import { AdvancedPhoto } from "@/components/photos/photo";
import Masonry from "react-masonry-css";

export function Gallery({ photos }) {
  return (
    <>
      <Masonry
        breakpointCols={3}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 [background-clip:padding-box]"
      >
        {photos?.map((photo, index) => (
          <AdvancedPhoto
            key={photo.name}
            priority="true"
            className="h-auto mb-4"
            photoData={photo}
          />
        ))}
      </Masonry>
    </>
  );
}
