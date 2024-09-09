import LightshowSplash from "@/components/lightshows/splash";

export const metadata = {
  title: "Lightshows",
  description: `I love making lightshows. Obtain all my project files, videos, and more here!`,
};

export default function LightshowsPage() {
  return (
    <div className="no-max-w -m-6 !mb-0 md:-m-12 2xl:-m-24">
      <LightshowSplash />
    </div>
  );
}
