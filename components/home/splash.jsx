import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function HomeSplash() {
  return (
    <section className="relative min-h-[calc(100vh-12rem)] overflow-hidden p-3 text-white md:p-8">
      <Icon
        name="StarGlobe"
        size="xl"
        className="absolute right-0 bottom-12 opacity-80"
      />
      <div className="flex items-center">
        <div className="relative z-10 grid w-full items-center gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <div className="relative h-96 w-full">
                <Image
                  src="/images/sidd.svg"
                  alt="Sidd"
                  className="object-contain p-8"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>

              <p className="mt-4 border-2 border-black bg-white px-4 py-3 text-xl leading-tight font-black text-black shadow-[6px_6px_0_#000] md:text-3xl">
                I code, produce films, design lights, and more{" "}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default" size="lg">
                <Link href="/about">
                  <Icon name="StarShadow" size="default" />
                  More
                </Link>
              </Button>

              <Button asChild variant="destructive" size="lg">
                <Link href="/projects">
                  <Icon name="StarStroke" size="sm" />
                  Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t-2 border-black bg-[#FFE121] py-1 mt-16 font-mono text-xs font-black text-black">
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
