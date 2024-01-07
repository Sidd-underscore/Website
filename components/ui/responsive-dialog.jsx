import * as React from "react";

import { useIsDesktop } from "@/lib/hooks";
import {
  Dialog as DesktopDialog,
  DialogContent as DesktopDialogContent,
  DialogDescription as DesktopDialogDescription,
  DialogHeader as DesktopDialogHeader,
  DialogTitle as DesktopDialogTitle,
  DialogTrigger as DesktopDialogTrigger,
  DialogFooter as DesktopDialogFooter,
  DialogClose as DesktopDialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export function Dialog({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialog {...props}>{children}</DesktopDialog>;
  }

  return <Drawer {...props}>{children}</Drawer>;
}

export function DialogContent({ children, className, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogContent className={className} {...props}>{children}</DesktopDialogContent>;
  }

  return (
    <DrawerContent className={cn("p-4", className)} {...props}>
      {children}
    </DrawerContent>
  );
}

export function DialogDescription({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <DesktopDialogDescription {...props}>{children}</DesktopDialogDescription>
    );
  }

  return <DrawerDescription {...props}>{children}</DrawerDescription>;
}

export function DialogHeader({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogHeader {...props}>{children}</DesktopDialogHeader>;
  }

  return <DrawerHeader {...props}>{children}</DrawerHeader>;
}

export function DialogTitle({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogTitle {...props}>{children}</DesktopDialogTitle>;
  }

  return <DrawerTitle {...props}>{children}</DrawerTitle>;
}

export function DialogTrigger({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogTrigger {...props}>{children}</DesktopDialogTrigger>;
  }

  return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
}

export function DialogFooter({ children, ...props }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogFooter {...props}>{children}</DesktopDialogFooter>;
  }

  return <DrawerFooter {...props}>{children}</DrawerFooter>;
}

export function DialogClose({children, ...props}) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopDialogClose {...props}>{children}</DesktopDialogClose>
  }

  return <DrawerClose {...props}>{children}</DrawerClose>
}