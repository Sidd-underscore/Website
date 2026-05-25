import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import Image from "next/image";
import { ICONS } from "@/components/ui/icon";

export function HomeSplash() {
  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden p-3 text-white md:p-8">
           <Icon
        name="StarGlobe"
        size="xl"
        className="absolute right-0 bottom-12 opacity-80"
      />

      <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          {/* <div className="flex w-fit items-center gap-2 border-2 border-black bg-[#FFE121] px-3 py-1 font-mono text-xs font-black text-black shadow-[4px_4px_0_#000]">
            <Icon name="ShootingStar" className="size-5" />
            <Icon name="Sun" className="size-5" />
          </div> */}

          <div>
            <div className="relative h-96 w-full">
              <Image
                src="/images/sidd.svg"
                alt="Sidd"
                className="object-contain p-8"
                fill
                priority
              />
            </div>

            <p className="mt-4 bg-white px-4 py-3 text-xl leading-tight font-black text-black shadow-[6px_6px_0_#000] md:text-3xl">
              i code, film and edit videos, run light boards, and more{" "}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="flex items-center gap-2 border-2 border-black bg-[#FF80F2] px-4 py-3 font-mono text-sm font-black text-black no-underline shadow-[5px_5px_0_#000] hover:bg-[#22FF00]"
            >
              More
              <Icon name="StarShadow" size="default" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 border-2 border-black bg-[#22FF00] px-4 py-3 font-mono text-sm font-black text-black no-underline shadow-[5px_5px_0_#000] hover:bg-[#FFE121]"
            >
              Projects
              <Icon name="StarStroke" size="default" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 overflow-hidden border-t-2 border-black bg-[#FFE121] py-1 font-mono text-xs font-black text-black">
        <div className="marquee-track flex w-max gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="flex items-center gap-8" key={index}>
              <Icon name="ShootingStar" className="opacity-80" />
              CODE
              <Icon name="StarOrbit" className="opacity-80" />
              LIGHTS
              <Icon name="Sun" className="opacity-80" />
              VIDEOS
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
