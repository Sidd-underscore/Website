"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "motion/react";

function Tabs({ defaultValue, onValueChange, ...props }) {


  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      data-slot="tabs"
      activationMode="manual"
      onValueChange={(e) => {
        if (onValueChange) onValueChange(e);
      }}
      {...props}
    />
  );
}

function TabsList({ className, children, ...props }) {
  return (
    <LayoutGroup>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "relative inline-flex h-9 items-center justify-center border-2 border-black bg-white text-black shadow-[4px_4px_0_#000] select-none",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </LayoutGroup>
  );
}

function TabsTrigger({ className, children, value, ...props }) {
  const tabRef = React.useRef(null);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      ref={tabRef}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center px-3 py-1 text-sm font-black whitespace-nowrap ring-offset-white transition-all hover:bg-[#22FF00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#FFE121] focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FF80F2] data-[state=active]:text-black",
        className,
      )}
      {...props}
    >
      <>
        <span className="z-10">{children}</span>
      </>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, value, ...props }) {

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn(
        "relative mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-[#FFE121] focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
