import { Link } from "@/components/ui/link";

export function Footer() {
  return (
    <div className="relative w-screen">
      <div className="z-10 absolute -top-[3.6rem] right-0 h-[3rem] w-[40vw] origin-bottom-right rotate-[358deg] border-t border-neutral-400 bg-neutral-50 dark:opacity-75 dark:border-neutral-700 dark:bg-neutral-900" />
      <div className="z-10 absolute -top-4 right-0 h-[3rem] w-[12rem] origin-bottom-right bg-neutral-50 dark:opacity-75 dark:bg-neutral-900" />

      <div className="absolute -top-12 left-0 z-20 h-12 w-screen origin-bottom-left rotate-[2deg] border-t border-neutral-400 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900" />

      <footer className="z-0 relative h-48 items-center justify-around bg-neutral-100 p-4 text-center dark:bg-neutral-900 md:flex">
        <div className="mx-auto w-fit">
          <SiddWordMark className="" />
        </div>

        <div className="pb-4 text-xs md:mx-auto md:mb-0">
          <p> Made with Next.js and love by Sidd in Portland, OR.</p>
          <p>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/i.jpg"
            >
              I
            </Link>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/v.jpg"
            >
              v
            </Link>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/y.jpg"
            >
              y
            </Link>{" "}
            says hi!
          </p>
        </div>
      </footer>
    </div>
  );
}

export function SiddWordMark({ className }) {
  return (
    <div className={"relative scale-50" + (className ? " " + className : "")}>
      {/* Vertical */}

      {/* s */}
      <div className="absolute left-[9.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[56px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* i */}
      <div className="absolute left-[81.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[99.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[115px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[133.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* d */}
      <div className="absolute left-[145px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[161.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[187px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[202.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* d */}
      <div className="absolute left-[215.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[231.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[257.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[272.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* Horizontal */}
      <div className="absolute -left-2 -right-2 top-[18px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute -left-2 -right-2 bottom-[21px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      <div className="absolute -left-2 -right-2 top-[43px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute -left-2 -right-2 bottom-[32.5px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      <span className="relative z-10 font-mono text-9xl font-bold">sidd</span>
    </div>
  );
}
