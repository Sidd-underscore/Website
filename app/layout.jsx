import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {default: "Sidd_", template: "%s / Sidd_"},
  description: "I code, take photos and livestream.",
};

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} justify-left flex flex-col mt-12 !pb-0 p-12 2xl:p-24 items-center dark:bg-zinc-950 dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="w-full max-w-5xl min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* For screen sizes */}
        <TailwindIndicator />
      </body>
    </html>
  );
}
