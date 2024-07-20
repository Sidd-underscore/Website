import { Projects } from "@/components/home/projects";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";
import { Achievements } from "@/components/home/achievements";
import { Blob } from "@/components/ui/blob";

export default function Home() {
  return (
    <div className="-mt-6 w-full text-left">
      <p>Hi, I&apos;m</p>
      <h1 className="text-7xl font-bold">Sidd!</h1>

      <p className="mt-12 items-center sm:flex">
        I code, take photos, enjoy working light boards, and live stream.{" "}
        <strong className="group cursor-pointer md:ml-2">
          <Link
            href="/about"
            className="mt-2 inline-flex items-center border-none sm:ml-2 sm:mt-0 md:ml-0"
          >
            More{" "}
            <ArrowRightIcon className="ml-1 h-4 w-4 transition-all group-hover:ml-2" />
          </Link>
        </strong>
      </p>
      <Projects />
      <Work />
      <Achievements />
      <FeaturedPhotos />

      {[1, 2, 3].map((index) => (
        <span key={index} className="hidden 2xl:block">
          <Blob
            style={{
              top: `${(16 * index) ** 2}px`,
              left: index % 2 === 0 && 0,
              right: index % 2 != 0 && 0,
            }}
            index={index}
          />
        </span>
      ))}
    </div>
  );
}
