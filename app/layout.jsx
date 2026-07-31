import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Archivo } from "next/font/google";
import "./globals.css";
import DitherOverlay from "@/components/dither";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Sidd", template: "%s / Sidd" },
  description: "I code, take photos and live stream.",
  metadataBase: new URL("https://sidd.studio"),
};

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-9999999999999 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
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
    <html
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
      className="relative"
    >
      <body
        className={`${archivo.className} relative justify-left flex min-h-screen flex-col items-center overflow-x-hidden overflow-y-scroll p-3 pb-0! text-white selection:bg-[#FFE121] selection:text-black md:p-8 2xl:p-14`}
        style={{ scrollbarGutter: "stable" }}
      >
        <Navbar />
        <main className="relative z-10 mt-12 min-h-screen w-full max-w-6xl has-[.no-max-w]:max-w-none lg:mt-14 xl:mt-16">
        {children}
        </main>
        <Footer />

        {/* For screen sizes */}
        <TailwindIndicator />
        <Analytics />
        <SpeedInsights />
        <DitherOverlay blendMode="overlay" speed={1.5} pixelSize={2} opacity={0.25} amount={0.8} />
      </body>
    </html>
  );
}
