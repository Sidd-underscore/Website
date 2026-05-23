"use client";

import { Link } from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { useIsDesktop } from "@/lib/hooks";

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
        <div className="fixed top-0 h-10 w-screen bg-linear-to-b from-neutral-50 to-transparent dark:from-neutral-950" />
        <nav
          data-element-reference="nav"
          className="z-[51] flex w-screen max-w-7xl items-center justify-between rounded-none border-b border-pink-300/50 bg-white/85 px-4 py-2 text-xs shadow-lg backdrop-blur-md transition md:text-sm lg:mx-10 lg:rounded-3xl lg:border xl:max-w-6xl dark:border-white/10 dark:bg-neutral-900/75"
        >
          <div className="flex items-center">
            {navItems.map((item) => (
                <Link
                key={item.link}
                 
                  href={item.link}
                  className={`${item.customCss || ""} group px-2`}
                >
                  {isDesktop && item.label}
                  {!isDesktop && item.shortLabel}

                 

               
                </Link>
            ))}
          </div>
        </nav>
      </div>
  );
}
