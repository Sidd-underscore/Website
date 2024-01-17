import { Projects } from "@/components/home/projects";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";

export default function Home() {
  return (
    <div className="w-full text-left">
      <p>Hi, I&apos;m</p>
      <h1 className="text-7xl font-bold">Sidd_!</h1>
      <sub>(it&apos;s short for Siddharth)</sub>

      <p className="mt-12 ,d:flex items-center">
        I code, take photos, enjoy working lightboards, and livestream.{" "}
        <strong className="group md:ml-2 cursor-pointer">
          <Link href="/about" className="inline-flex mt-2 md:mt-0 items-center border-none">
            More{" "}
            <ArrowRightIcon className="ml-1 h-4 w-4 transition-all group-hover:ml-2" />
          </Link>
        </strong>
      </p>
      <Projects />
      <Work />
      <FeaturedPhotos />
    </div>
  );
}
