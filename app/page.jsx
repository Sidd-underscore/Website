import { Projects } from "@/components/home/projects";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";
import { Achievements } from "@/components/home/achievements";

export default function Home() {
  return (
    <div className="w-full text-left">
      <p>Hi, I&apos;m</p>
      <h1 className="space-x-1 pl-2 text-9xl font-bold text-pink-300">sidd</h1>

      <p className="mt-12 items-center sm:flex">
        I code, film videos, take photos, enjoy working light boards, and live
        stream.{" "}
        <strong className="group cursor-pointer md:ml-2">
          <Link
            href="/about"
            className="mt-2 inline-flex items-center border-none sm:mt-0 sm:ml-2 md:ml-0"
          >
            More{" "}
            <ArrowRightIcon className="ml-1 size-4 transition-all group-hover:ml-2" />
          </Link>
        </strong>
      </p>
      <Projects />
      <Work />
      <Achievements />
      <FeaturedPhotos />
    </div>
  );
}
