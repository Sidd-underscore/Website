import { Photo } from "@/components/photos/photo"
import originalPhotosArray from "@/lib/photos.json"

const photos1 = [];
const photos2 = [];

for (let i = 0; i < originalPhotosArray.length; i += 1) {
  if (i % 2 === 0) {
    photos1.push(originalPhotosArray[i]);

  } else {
    photos2.push(originalPhotosArray[i]);

  }
}

export default function PhotosPageWow() {
  return (
    <>
      <h1 className="text-5xl font-bold">Photography</h1>
<div className="my-6 flex gap-4">
      <div className="flex flex-col w-1/2 space-y-4">
      {photos1.map((photo) => (
        <Photo key={photo.name} photoData={photo} />
      ))}
      </div>
      <div className="flex flex-col w-1/2 space-y-4">
      {photos2.map((photo) => (
        <Photo key={photo.name} photoData={photo} />
      ))}
      </div>
      </div>
    </>
  );
}
