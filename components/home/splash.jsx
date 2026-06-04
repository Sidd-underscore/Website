import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function HomeSplash() {
  return (
    <section className="relative min-h-[50vh] overflow-hidden p-3 text-white md:p-8">
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

              <div className="flex w-full justify-center">
                <div className="mt-4 w-fit justify-center space-y-4 border-2 border-black bg-white px-6 py-4 text-center text-xl leading-tight font-black text-black shadow-[6px_6px_0_#000] md:text-2xl">
                  <p> I code, produce films, design lights, and more</p>
                  <div className="flex w-full flex-wrap justify-center gap-3">
                    <Button asChild variant="default" size="lg">
                      <Link href="/about">
                        <Icon name="StarShadow" size="default" />
                        About Me
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
          </div>
        </div>
      </div>
    </section>
  );
}
