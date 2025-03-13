import { motion } from "motion/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { EnvelopeClosedIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";

export function FinalSection({ display, opacity, position }) {
  return (
    <motion.div
      style={{ display, opacity, position }}
      className="top-[50%] left-[50%] mt-[5rem] translate-x-[-50%] translate-y-[-50%] text-center"
    >
      <Button asChild className="group mt-8" variant="secondary">
        <Link href="mailto:hello@sidd.studio">
          <EnvelopeClosedIcon className="mr-2 block size-4 group-hover:invisible group-hover:hidden" />
          <EnvelopeOpenIcon className="invisible mr-2 hidden size-4 group-hover:visible group-hover:block" />
          <span>Contact me!</span>
        </Link>
      </Button>
    </motion.div>
  );
}
