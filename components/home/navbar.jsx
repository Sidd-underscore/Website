import Image from "next/image";
import { Link } from "@/components/ui/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

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
  return (
    <div className="fixed left-0 top-0 z-10 flex w-screen items-center justify-center md:top-4 ">
      <nav className="z-20 flex w-screen max-w-5xl items-center justify-between rounded-none border-b border-zinc-500/25 bg-zinc-50/90 px-4 py-2 text-xs shadow backdrop-blur-md transition md:top-4 md:w-[calc(100%_-_32px)] md:rounded-3xl md:border md:text-sm dark:border-white/10 dark:bg-zinc-900/75">
        <p className="flex items-center space-x-4">
          <NavItem
            underline={false}
            item={{
              link: "/",
              label: (
                <Image
                  alt="Sidd's logo"
                  width={24}
                  height={24}
                  src="/images/sidd.png"
                />
              ),
            }}
          />
          <NavItem item={{ link: "/about", label: "About Me" }} />
          <NavItem item={{ link: "/photos", label: "Photography" }} />
        </p>
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
