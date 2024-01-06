import { Gallery } from "@/components/photos/gallery";

export const metadata = {
  title: "Photography",
};

export default function PhotosPageWow() {

  return (
    <>
      <h1 className="text-5xl font-bold">Photography</h1>

      <Gallery />
    </>
  );
}
