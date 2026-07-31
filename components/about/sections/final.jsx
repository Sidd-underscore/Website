import { motion } from "motion/react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, MailOpen, ExternalLink, Paperclip } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export function FinalSection({ display, opacity, position }) {
  return (
    <motion.div
      style={{ display, opacity, position }}
      className="relative top-[50%] left-[50%] w-full max-w-xl translate-x-[-50%] translate-y-[-50%] px-4 text-center"
    >
      <div className="panel relative mx-auto overflow-hidden p-6 text-black">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#45e52c,#FFE121,#FF80F2,#00D7FF)]" />

        <div className="mx-auto mb-4 flex w-fit items-center gap-2 border-2 border-black bg-[#FFE121] px-3 py-1 font-mono text-xs font-black uppercase shadow-[5px_5px_0_#000]">
          <Icon name="ShootingStar_2" size="sm" className="opacity-90" />
          Say hi
        </div>

        <p className="mx-auto max-w-prose text-sm font-black leading-snug">
          I&apos;m always down to chat and make cool stuff!
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="group" variant="default">
            <Link href="mailto:hello@sidd.studio">
              <Mail className="mr-2 block size-4 group-hover:invisible group-hover:hidden" />
              <MailOpen className="invisible mr-2 hidden size-4 group-hover:visible group-hover:block" />
              <span>Email me</span>
            </Link>
          </Button>
          <Button asChild className="group" variant="secondary">
            <Link
              target="_blank"
              href="https://docs.google.com/document/u/1/d/e/2PACX-1vQXvkuGlTvrrmcohbt0IMEwqICI7LXFGADMdX1dmSIJqNIKYZjiAamP3D5tZEEXJYuOZX0zUMpmSXoZ/pub"
            >
              <Paperclip className="mr-2 block size-4 group-hover:invisible group-hover:hidden" />
              <ExternalLink className="invisible mr-2 hidden size-4 group-hover:visible group-hover:block" />
              <span>Resume</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
