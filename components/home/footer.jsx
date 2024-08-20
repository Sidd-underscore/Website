import { Link } from "@/components/ui/link";

export function Footer() {
  return (
    <div className="relative w-screen">
      <div className="absolute -top-8 border-t border-neutral-700 left-0 h-12 w-full origin-bottom-right -rotate-[2deg] bg-neutral-900 opacity-75"/>
      <div className="z-10 absolute -top-12 border-t border-neutral-700 left-0 h-12 w-full origin-bottom-left rotate-[3deg] bg-neutral-900" />


      <footer className="relative md:flex h-48 items-center justify-around p-4 text-center dark:bg-neutral-900">
        <div className="w-fit mx-auto">
          <SiddWordMark className=""/>
        </div>

        <div className="pb-4 md:mb-0 md:mx-auto text-xs">
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
