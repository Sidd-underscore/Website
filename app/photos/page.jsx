import { PhotosSplash } from "@/components/photos/photos-splash";

export const metadata = {
  title: "Photography",
};

export default function PhotosPage() {
  return (
    <div className="no-max-w">
      <PhotosSplash />
    </div>
  );
}
