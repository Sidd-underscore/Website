"use client";

import { Link } from "@/components/ui/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useNavbarLogo } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function NavItem({ item, underline }) {
  return (
    <Link
      className={underline === false ? "border-none" : undefined}
      href={item.link}
    >
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const { navbarLogo, setNavbarLogo } = useNavbarLogo();
  const path = usePathname();

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
            className="absolute left-3 top-2.5 h-8 w-8 transition-[width_height] hover:-left-2 hover:top-0 hover:h-[72px] hover:w-[72px] hover:-rotate-12 hover:[filter:drop-shadow(1px_0_0_white)_drop-shadow(0_1px_0_white)_drop-shadow(-1px_0_0_white)_drop-shadow(0_-1px_0_white)] dark:hover:[filter:drop-shadow(1px_0_0_#09090b)_drop-shadow(0_1px_0_#09090b)_drop-shadow(-1px_0_0_#09090b)_drop-shadow(0_-1px_0_#09090b)]"
            src="/images/sidd.png"
          />
        ),
      });
    }
  }, [path, setNavbarLogo]);

  return (
    <div className="fixed left-0 top-0 z-10 flex w-screen items-center justify-center xl:top-4 ">
      <div className="fixed top-0 h-4 w-screen bg-neutral-50 dark:bg-neutral-950" />

      <nav
        data-element-reference="nav"
        className="z-20 flex w-screen max-w-7xl items-center justify-between rounded-none border-b border-neutral-500/25 bg-neutral-50/70 px-4 py-2 text-xs shadow backdrop-blur-md transition md:text-sm xl:max-w-6xl xl:rounded-3xl xl:border dark:border-white/10 dark:bg-neutral-900/75"
      >
        <p className="flex items-center space-x-4">
          <NavItem underline={false} item={navbarLogo} />
          <NavItem
            underline={false}
            item={{
              link: "/about",
              label: (
                <span className="ml-6 border-b border-pink-400 text-sm transition-all hover:border-pink-500 dark:border-pink-200 dark:text-pink-200 dark:hover:border-pink-300 dark:hover:text-pink-300">
                  About Me
                 </span>
              ),
            }}
          />
          <NavItem item={{ link: "/photos", label: "Photography" }} />
        </p>
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
