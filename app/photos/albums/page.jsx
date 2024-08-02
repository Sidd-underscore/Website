import { PhotosMain } from "@/components/photos/main";

export const metadata = {
  title: "Albums / Photography",
};

export default function AlbumsPage() {

  return (
    <>
      <h1 className="text-5xl font-bold">Photography</h1>

      <PhotosMain />
    </>
  );
}
