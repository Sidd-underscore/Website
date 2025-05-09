"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "motion/react";
import { useTabs } from "@/lib/utils";

function Tabs({ defaultValue, onValueChange, ...props }) {
  const { activeTab, setActiveTab } = useTabs();

  React.useEffect(() => {
    if (defaultValue && activeTab === null) {
      setActiveTab(defaultValue);
    }
  }, [activeTab, setActiveTab, defaultValue]);

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      data-slot="tabs"
      activationMode="manual"
      onValueChange={(e) => {
        if (onValueChange) onValueChange(e);
        setActiveTab(e);
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
          "relative inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 select-none dark:bg-neutral-900 dark:text-neutral-400",
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
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      ref={tabRef}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap ring-offset-white transition-all hover:text-black focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black dark:ring-offset-neutral-950 dark:hover:text-white dark:focus-visible:ring-neutral-300 dark:data-[state=active]:text-neutral-50",
        className,
      )}
      {...props}
    >
      <>
        <span className="z-10">{children}</span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 rounded-md bg-white shadow-sm dark:bg-neutral-800"
            layoutId="active-tab"
            aria-hidden="true"
            style={{
              width: tabRef.current?.getBoundingClientRect().width,
              height: tabRef.current?.getBoundingClientRect().height,
            }}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, value, ...props }) {
  const { activeTab } = useTabs();

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn(
        "relative mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
        className,
      )}
      {...props}
    >
      {activeTab === value && props.children}
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
