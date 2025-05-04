import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { TransitionLayout } from "@/components/home/transition-layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AppProvider } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Sidd", template: "%s / Sidd" },
  description: "I code, take photos and live stream.",
  metadataBase: new URL("https://sidd.studio"),
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${archivo.className} justify-left mt-12 flex flex-col items-center overflow-x-hidden bg-neutral-50 p-6 pb-0! text-neutral-900 md:p-12 2xl:p-24 dark:bg-neutral-950 dark:text-white`}
      >
        <ThemeProvider>
          <AppProvider>
            <Navbar />
            <main className="mt-6 min-h-screen w-full max-w-5xl has-[.no-max-w]:max-w-none lg:mt-8 xl:mt-10 2xl:mt-0">
              <TransitionLayout>{children}</TransitionLayout>
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
  );
}
