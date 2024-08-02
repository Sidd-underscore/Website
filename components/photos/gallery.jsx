import { AdvancedPhoto } from "@/components/photos/photo";

export function Gallery({ photos1, photos2 }) {
  return (
    <>
      <div className={"flex w-1/2 flex-col space-y-4"}>
      {photos1?.map((photo, index) => (
          <AdvancedPhoto
            key={photo.name}
            priority={index < 4 ? true : false}
            className="h-auto"
            photoData={photo}
          />
        ))}
      </div>
      <div className={"flex w-1/2 flex-col space-y-4"}>
        {photos2?.map((photo, index) => (
          <AdvancedPhoto
            key={photo.name}
            priority={index < 4 ? true : false}
            className="h-auto"
            photoData={photo}
          />
        ))}
      </div>
    </>
  );
}
