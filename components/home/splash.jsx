import { Sparkles } from "@/components/ui/sparkles";
import { Link } from "@/components/ui/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export function HomeSplash() {
  return (
    <div className="relative flex min-h-96 justify-center p-10 md:min-h-124">
      <div className="w-full max-w-5xl">
        <p>Hi, I&apos;m</p>
        <h1 className="space-x-1 pl-2 text-9xl font-bold text-pink-300">
          sidd
        </h1>

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
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full">
        <Sparkles
          speed={1}
          id="home-sparkles-woohoo"
          background="transparent"
          minSize={0.6}
          maxSize={1}
          particleDensity={40}
          className="h-full w-full"
          particleColor="#737373"
        />
      </div>
    </div>
  );
}
