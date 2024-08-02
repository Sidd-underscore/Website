"use client";

import { Link } from "@/components/ui/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useNavbarLogo } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const { navbarLogo, setNavbarLogo } = useNavbarLogo();
  const path = "/" + usePathname().split("/")[1];
  const [hoveredPath, setHoveredPath] = useState(path);

  const navItems = [
    {
      ...navbarLogo,
    },
    {
      link: "/about",
      label: "About Me",
      useMagneticUnderline: true,
      customCss: "ml-6"
    },
    { link: "/photos", label: "Photography", useMagneticUnderline: true },
  ];

  useEffect(() => {
    if (path != "/about") {
      setNavbarLogo({
        link: "/",
        label: (
          <Image
            alt="Sidd's logo"
            width={250}
            height={250}
            quality={100}
            className="flex absolute left-3 top-2.5 h-8 w-8 transition-[width_height] hover:-left-2 hover:top-0 hover:h-[72px] hover:w-[72px] hover:-rotate-12 hover:[filter:drop-shadow(1px_0_0_white)_drop-shadow(0_1px_0_white)_drop-shadow(-1px_0_0_white)_drop-shadow(0_-1px_0_white)] dark:hover:[filter:drop-shadow(1px_0_0_#09090b)_drop-shadow(0_1px_0_#09090b)_drop-shadow(-1px_0_0_#09090b)_drop-shadow(0_-1px_0_#09090b)]"
            src="/images/sidd.png"
          />
        ),
      });
    }

    setHoveredPath(path)
  }, [path]);

  return (
    <div className="fixed left-0 top-0 z-50 flex w-screen items-center justify-center lg:top-4 ">
      <div className="to:transparent fixed top-0 h-10 w-screen bg-gradient-to-b from-neutral-50 via-transparent dark:from-neutral-950" />

      <nav
        data-element-reference="nav"
        className="flex w-screen max-w-7xl items-center justify-between rounded-none border-b bg-white/80 border-neutral-300/75 px-4 py-2 text-xs backdrop-blur-md transition dark:border-white/10 dark:bg-neutral-900/75 md:text-sm lg:mx-10 lg:rounded-3xl lg:border xl:max-w-6xl"
      >
        <div className="flex items-center">
          {navItems.map((item) => (
            <motion.span layout key={item.link}>
              <Link
                onMouseEnter={() => item.useMagneticUnderline && setHoveredPath(item.link)}
                onMouseLeave={() => item.useMagneticUnderline && setHoveredPath(path)}
                
                href={item.link}
                data-active={item.link === hoveredPath}
                className={`${item.useMagneticUnderline ? "relative" : ""} ${item.customCss} group px-2 h-full`}
              >
                <span className="w-fit">
                {item.label}
                {item.useMagneticUnderline && item.link === hoveredPath && (
                  <motion.div
                    className={`!pointer-events-none !cursor-default bottom-0 left-0 -z-10 h-[1.5px] rounded-full bg-pink-400 group-hover:bg-pink-500 dark:bg-pink-200 group-hover:dark:bg-pink-300`}
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                 
                )}

                {item.link === hoveredPath && (
                  <motion.div
                    className={`!pointer-events-none !cursor-default absolute bottom-0.5 blur-lg ${hoveredPath === "/" ? "left-3" : "left-0"} -z-10 h-[1.25em] rounded-full bg-pink-500 dark:bg-pink-300`}
                    layoutId="navbar1"
                    aria-hidden="true"
                    style={{
                      width: hoveredPath === "/" ? "98%" : "100%",
                      opacity: .25
                    }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                </span>
              </Link>
            </motion.span>
          ))}
        </div>
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
