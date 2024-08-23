import { PhotosSplash } from "@/components/photos/splash";

export const metadata = {
  title: "Photography",
};

export default function PhotosPage() {
  return (
    <div className="2xl no-max-w">
      <PhotosSplash />
    </div>
  );
}
