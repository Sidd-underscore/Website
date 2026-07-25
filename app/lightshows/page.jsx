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
    <div className="no-max-w -m-6 mb-0! md:-m-12 2xl:-m-24">
      <LightshowSplash />

      <p className="panel mx-auto my-10 max-w-5xl p-6 text-center text-lg font-bold">
        <Icon name="Sun" className="mr-2 inline-block size-6" />
        All of my lightshows are rendered using{" "}
        <Link href="https://www.capture.se/">Capture Student Edition</Link>. I
        custom-design the rigs for each show using{" "}
        <Link href="https://www.blender.org">Blender</Link>{" "}
        for the overall
        architecture and Capture to install the lights, truss, and other plot
        annotations. After the rig is ready, I use ETC&apos;s EOS system to
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
