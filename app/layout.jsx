import { Archivo } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Sidd", template: "%s / Sidd" },
  description: "I code, take photos and live stream.",
  metadataBase: new URL("https://sidd-website.vercel.app"),
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#212529" },
  ],
};

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${archivo.className} justify-left mt-12 flex flex-col items-center overflow-x-hidden p-6 !pb-0 scrollbar-track-rounded-none dark:bg-neutral-950 dark:text-white md:p-12 2xl:p-24`}
        >
          <ThemeProvider>
            <AppProvider>
              <Navbar />
              <main className="mt-6 min-h-screen w-full max-w-5xl has-[.no-max-w]:max-w-none lg:mt-8 xl:mt-10 2xl:mt-0">
                {children}
              </main>
              <Footer />

              {/* For screen sizes */}
              <TailwindIndicator />
            </AppProvider>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
