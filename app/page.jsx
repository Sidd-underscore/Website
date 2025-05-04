import { Projects } from "@/components/home/projects";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";
import { Achievements } from "@/components/home/achievements";
import { HomeSplash } from "@/components/home/splash";

export default function Home() {
  return (
    <div>
      <HomeSplash />

      <Projects />
      <Work />
      <Achievements />
      <FeaturedPhotos />
    </div>
  );
}
