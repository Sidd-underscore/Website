"use client";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { useIsDesktop } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const path = "/" + usePathname().split("/")[1];
  const isDesktop = useIsDesktop();

  const navItems = [
    {
      link: "/about",
      label: "About Me",
      shortLabel: "About",
    },
    {
      link: "/coding",
      label: "Coding",
      shortLabel: "Coding",
    },
    {
      link: "/design",
      label: "Design",
      shortLabel: "Design",
    },
    {
      link: "/lightshows",
      label: "Lightshows",
      shortLabel: "Lights",
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen items-center justify-center lg:top-4">
      <nav
        data-element-reference="nav"
        className="checker-surface z-[51] flex w-screen items-center justify-between gap-3 rounded-none border-2 border-black bg-white px-3 py-2 text-xs text-black transition md:text-sm lg:mx-10 xl:max-w-7xl"
      >
        <Link
          href="/"
          className="flex items-center group gap-2 border-0 bg-black px-2 py-1 font-mono text-sm font-black text-[#22FF00] no-underline hover:bg-[#FF80F2] hover:text-black md:text-base"
        >
          <Icon name="StarShadow" className="size-5 invert group-hover:invert-0 transition-all" />
          <span>SIDD</span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.link}
              aria-current={path === item.link ? "page" : undefined}
              href={item.link}
              className={cn(
                "group flex items-center gap-1 border-2 border-transparent px-2 py-1 font-mono font-black text-black no-underline hover:border-black hover:bg-[#22FF00] hover:text-black",
                path === item.link && "border-black bg-[#FFE121]",
                item.customCss,
              )}
            >

              <Icon
                name={path === item.link ? "CircleStarHollow" : "CircleStarFill"}
                size="sm"
              />
              <span className="sm:hidden">{item.shortLabel}</span>
              <span className="hidden sm:block">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
