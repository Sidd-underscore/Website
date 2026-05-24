import { Link } from "@/components/ui/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export function HomeSplash() {
  return (
    <div className="relative flex min-h-96 justify-center p-10 md:min-h-124">
      <div className="w-full max-w-5xl">
        <div className="relative h-96 w-full">
          <Image src="/images/sidd.svg" alt="Sidd" className="mx-auto" fill />
        </div>

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
    </div>
  );
}
