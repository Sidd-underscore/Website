import { Projects } from "@/components/home/projects";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";
import { Achievements } from "@/components/home/achievements";
import { Blob } from "@/components/ui/blob";

export default function Home() {
  return (
    <div className="w-full text-left mt-5">
      <p>Hi, I&apos;m</p>
      <h1 className="text-7xl font-bold">Sidd!</h1>

      <p className="mt-12 sm:flex items-center">
        I code, take photos, enjoy working light boards, and live stream.{" "}
        <strong className="group md:ml-2 cursor-pointer">
          <Link href="/about" className="inline-flex mt-2 sm:mt-0 sm:ml-2 md:ml-0 items-center border-none">
            More{" "}
            <ArrowRightIcon className="ml-1 h-4 w-4 transition-all group-hover:ml-2" />
          </Link>
        </strong>
      </p>
      <Projects />
      <Work />
      <Achievements />
      <FeaturedPhotos />

      {[1, 2, 3, 4, 5, 6].map((index) => (
              <span key={index}>
                <Blob index={index} />
              </span>
            ))}
    </div>
  );
}
