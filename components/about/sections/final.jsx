import { motion } from "motion/react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnvelopeClosedIcon, EnvelopeOpenIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export function FinalSection({ display, opacity, position }) {
  return (
    <motion.div
      style={{ display, opacity, position }}
      className="top-[50%] left-[50%] mt-20 space-x-2 translate-x-[-50%] translate-y-[-50%] text-center"
    >
      <Button asChild className="group mt-8" variant="default">
        <Link href="mailto:hello@sidd.studio">
          <EnvelopeClosedIcon className="mr-2 block size-4 group-hover:invisible group-hover:hidden" />
          <EnvelopeOpenIcon className="invisible mr-2 hidden size-4 group-hover:visible group-hover:block" />
          <span>Contact me!</span>
        </Link>
      </Button>
       <Button asChild className="group mt-8" variant="secondary">
        <Link target="_blank" href="https://docs.google.com/document/u/1/d/e/2PACX-1vQXvkuGlTvrrmcohbt0IMEwqICI7LXFGADMdX1dmSIJqNIKYZjiAamP3D5tZEEXJYuOZX0zUMpmSXoZ/pub">
          <PaperClipIcon className="mr-2 block size-4 group-hover:invisible group-hover:hidden" />
          <OpenInNewWindowIcon className="invisible mr-2 hidden size-4 group-hover:visible group-hover:block" />
          <span>View my resume</span>
        </Link>
      </Button>
    </motion.div>
  );
}
