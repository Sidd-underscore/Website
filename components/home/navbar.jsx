"use client";

import { Link } from "@/components/ui/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useNavbarLogo } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIsDesktop } from "@/lib/hooks";

export function SiddNavbarLogo({ ...props }) {
  return (
    <Image
      alt="Sidd's logo"
      width={250}
      height={250}
      quality={100}
      className="absolute top-1 bottom-1 left-1 h-11 w-auto rounded-full grayscale transition-all duration-500 hover:grayscale-0 hover:invert-0! dark:invert"
      src="/images/sidd.png"
      {...props}
    />
  );
}

export function Navbar() {
  const { navbarLogo, setNavbarLogo } = useNavbarLogo();
  const path = "/" + usePathname().split("/")[1];
  const [hoveredPath, setHoveredPath] = useState(path);
  const isDesktop = useIsDesktop();

  const navItems = [
    {
      ...navbarLogo,
    },
    {
      link: "/about",
      label: "About Me",
      useMagneticUnderline: true,
      customCss: "ml-6",
      shortLabel: "About",
    },
    {
      link: "/coding",
      label: "Coding",
      useMagneticUnderline: true,
      shortLabel: "Coding",
    },
    {
      link: "/design",
      label: "Design",
      useMagneticUnderline: true,
      shortLabel: "Design",
    },
    {
      link: "/photos",
      label: "Photography",
      useMagneticUnderline: true,
      shortLabel: "Photos",
    },
    {
      link: "/lightshows",
      label: "Lightshows",
      useMagneticUnderline: true,
      shortLabel: "Lights",
    },
  ];

  useEffect(() => {
    if (path != "/about") {
      setNavbarLogo({
        link: "/",
        label: <SiddNavbarLogo />,
        shortLabel: <SiddNavbarLogo />,
      });
    }

    setHoveredPath(path);
  }, [path]);

  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen items-center justify-center lg:top-4">
      <div className="fixed top-0 h-10 w-screen bg-linear-to-b from-neutral-50 to-transparent dark:from-neutral-950" />

      <nav
        data-element-reference="nav"
        className="z-[51] flex w-screen max-w-7xl items-center justify-between rounded-none border-b border-pink-300/50 bg-white/85 px-4 py-2 text-xs shadow-lg transition md:text-sm backdrop-blur-md lg:mx-10 lg:rounded-3xl lg:border xl:max-w-6xl dark:border-white/10 dark:bg-neutral-900/75"
      >
        <div className="flex items-center">
          {navItems.map((item) => (
            <motion.span layout key={item.link}>
              <Link
                onMouseEnter={() =>
                  item.useMagneticUnderline && setHoveredPath(item.link)
                }
                onMouseLeave={() =>
                  item.useMagneticUnderline && setHoveredPath(path)
                }
                href={item.link}
                data-active={item.link === hoveredPath}
                className={`${item.customCss || ""} group px-2 ${item.useMagneticUnderline ? "relative" : ""}`}
              >
                  {isDesktop && item.label}
                  {!isDesktop && item.shortLabel}

                {item.useMagneticUnderline && item.link === hoveredPath && (
                  <motion.div
                    className={`absolute -bottom-1 left-0 -z-10 mx-2 h-[1.5px] w-[calc(100%_-_16px)] rounded-full bg-pink-400 group-hover:bg-pink-500 dark:bg-pink-200 dark:group-hover:bg-pink-300`}
                    layoutId="navbar"
                    style={{ opacity: 0.75 }}
                    aria-hidden="true"
                    transition={{ type: "spring", duration: 0.25 }}
                  />
                )}

                {item.link === hoveredPath && (
                  <motion.div
                    className={`absolute bottom-0 left-0 -z-10 h-[1.25em] rounded-full bg-pink-500 blur-lg dark:bg-pink-300`}
                    layoutId="navbar1"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                      opacity: 0.25,
                    }}
                    transition={{ type: "spring", duration: 0.25 }}
                  />
                )}
              </Link>
            </motion.span>
          ))}
        </div>
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
