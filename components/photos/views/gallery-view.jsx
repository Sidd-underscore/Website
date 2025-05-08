import { AdvancedPhoto } from "@/components/photos/photo";
import Masonry from "react-masonry-css";
import { motion } from "motion/react";

export function GalleryView({ photos }) {
  if (!photos?.length) {
    return null;
  }

  return (
    <Masonry
      breakpointCols={3}
      className="-ml-4 flex w-auto"
      columnClassName="pl-4 [background-clip:padding-box]"
    >
      {photos.map((photo, index) => (
        <motion.div
          key={photo.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <AdvancedPhoto
            priority="true"
            className="h-auto w-full"
            photoData={photo}
          />
        </motion.div>
      ))}
    </Masonry>
  );
}
