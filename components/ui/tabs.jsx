"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTabs } from "@/lib/utils";

const Tabs = ({ defaultValue, onValueChange, ...props }) => {
  const { activeTab, setActiveTab } = useTabs();

  React.useEffect(() => {
    if (defaultValue && activeTab === null) {
      setActiveTab(defaultValue);
    }
  }, [activeTab, setActiveTab, defaultValue]);

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      activationMode="manual"
      onValueChange={(e) => {
        if (onValueChange) onValueChange(e);
        setActiveTab(e);
      }}
      {...props}
    />
  );
};

Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative inline-flex h-9 select-none items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(
  ({ className, children, value, ...props }, ref) => {
    const tabRef = React.useRef(null);
    const { activeTab } = useTabs();
    const isActive = activeTab === value;

    return (
      <TabsPrimitive.Trigger
        ref={tabRef}
        value={value}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black dark:ring-offset-neutral-950 dark:hover:text-white dark:focus-visible:ring-neutral-300 dark:data-[state=active]:text-neutral-50",
          className,
        )}
        {...props}
      >
        <>
          <span className="z-10">{children}</span>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 rounded-md bg-white shadow dark:bg-neutral-800"
              layoutId="tabsActive"
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
  },
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const { activeTab } = useTabs();

  return (
    <TabsPrimitive.Content
      ref={ref}
      value={value}
      className={cn(
        "relative mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
        className,
      )}
      {...props}
    >
      {activeTab === value && props.children}
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
