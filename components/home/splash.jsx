import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function HomeSplash() {
  return (
    <section className="relative min-h-[25vh] overflow-hidden p-3 text-white md:p-8">
      <div className="flex items-center">
        <div className="relative z-10 grid w-full items-center gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <div className="relative h-96 w-full">
                <Image
                  draggable={false}
                  src="/images/sidd.svg"
                  alt="Sidd"
                  className="object-contain"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>

              <div className="checker-surface flex w-full justify-center border-2">
                <div className="mx-6 my-4 md:mx-8 md:my-6 w-fit justify-center space-y-8 text-center">
                  <p className="text-lg leading-tight font-bold text-black md:text-2xl">
                    I code, produce films, design lights, and more...
                  </p>
                  <div className="flex w-full flex-wrap justify-center gap-3">
                    <Button asChild variant="default" size="lg">
                      <Link href="/about">
                        <Icon name="StarShadow" size="default" />
                        About Me
                      </Link>
                    </Button>

                    <Button asChild variant="destructive" size="lg">
                      <Link href="/projects">
                        <Icon name="StarGroup3_2" size="default" />
                        Projects
                      </Link>
                    </Button>
                  </div>

                  <p className="text-neutral-700 animate-bounce duration-4000 italic">or, scroll to see more!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
