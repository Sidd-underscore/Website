import { Projects } from "@/components/home/projects";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { FeaturedPhotos } from "@/components/photos/featured";
import { Work } from "@/components/home/work";
import { Achievements } from "@/components/home/achievements";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="w-full text-left">
      <p>Hi, I&apos;m</p>
      <h1 className="font-bold space-x-1 leading-none [background-size:400%_400%] bg-clip-text text-transparent animate-background-move bg-gradient-to-r from-pink-400 dark:from-pink-500 via-purple-300 dark:via-purple-500 to-blue-400 dark:to-blue-600">
        <span className={dancingScript.className + " text-[16rem]"}>S</span>
        <span className="text-[8rem]">idd</span>
      </h1>

      <p className="mt-12 items-center sm:flex">
        I code, film videos, take photos, enjoy working light boards, and live stream.{" "}
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

      
    </div>
  );
}
