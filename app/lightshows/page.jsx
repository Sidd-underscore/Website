import { LightshowGallery } from "@/components/lightshows/gallery";
import LightshowSplash from "@/components/lightshows/splash";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";

export const metadata = {
  title: "Lightshows",
  description: `I love making lightshows. Here are some videos of them!`,
};

export default function LightshowsPage() {
  return (
    <div className="no-max-w md:-mt-22 xl:-mt-24 2xl:-mt-32 -m-6 mb-0! md:-m-12 2xl:-m-24 text-white">
      <LightshowSplash />

      <p className="panel m-8 xl:mx-auto max-w-6xl p-4 xl:p-6 text-center text-base md:text-lg font-bold">
        All of my lightshows are rendered using{" "}
        <Link href="https://www.capture.se/">Capture Student Edition</Link>. I
        custom-design the rigs for each show using{" "}
        <Link href="https://www.blender.org">Blender</Link>{" "}
        for the overall
        architecture and Capture to install the lights, truss, and other plot
        annotations. After the rig is ready, I use <Link href="https://www.etcconnect.com/eos-software/">ETC&apos;s EOS system</Link> to
        program lights using their downloadable software for PC and the built-in
        visualizer mode. This outputs a virtual signal through sACN to Capture,
        which I then use to record the DMX outputs and render video. Afterwards,
        I upload the really good shows I like to YouTube. Below are some of my
        best.
      </p>

      <LightshowGallery />
    </div>
  );
}
