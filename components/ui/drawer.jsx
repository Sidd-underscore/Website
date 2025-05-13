"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function Drawer({ shouldScaleBackground = true, ...props }) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      data-slot="drawer"
      {...props}
    />
  );
}

function DrawerTrigger({ ...props }) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto w-screen flex-col rounded-t-[10px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-neutral-100 dark:bg-neutral-800" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      asChild={true}
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
