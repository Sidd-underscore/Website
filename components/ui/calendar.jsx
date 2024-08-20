"use client";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  rootClassName,
  classNames,
  showOutsideDays = true,
  availableDates,
  ...props
}) {

  const className = {
    root: "!border-neutral-200 dark:!border-neutral-800 px-8",
    months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0",
    month: "space-y-4 mx-2",
    month_caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "flex items-center",
  
    button_previous: cn(
      buttonVariants({ variant: "ghost" }),
      "h-[calc(100%-8px)] top-1 bottom-1 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 rounded-sm",
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost" }),
      "h-[calc(100%-8px)] top-1 bottom-1 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 rounded-sm",
    ),
  
    month_grid: "w-full border-collapse space-y-1",
    weekdays: "flex justify-around",
    weekday:
      "text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400",
    week: "flex w-full mt-2",
    day: cn(
      "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected=true])]:!bg-neutral-50 [&:has([aria-selected].day-outside)]:bg-neutral-50/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
      props.mode === "range"
        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        : "[&:has([aria-selected])]:rounded-md",
    ),
    day_button: cn(
      buttonVariants({ variant: "ghost" }),
      "h-[30px] w-[30px] m-0.5 p-0 font-normal aria-selected:opacity-100 border-none",
    ),
    range_start:
      "text-white dark:text-neutral-950 hover:text-white day-range-start",
    range_end: "text-white dark:text-neutral-950 hover:text-white day-range-end",
    selected: cn(
      "text-neutral-50 hover:text-neutral-50 focus:text-neutral-50 dark:text-neutral-900 dark:hover:text-neutral-900 dark:focus:!text-neutral-900",
      props.mode === "range" ? "" : "rounded-md",
    ),
    today:
      "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 rounded-md",
    outside: "day-outside text-neutral-500 opacity-50",
    disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
    range_middle: "",
    hidden: "invisible",
    ...classNames
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", rootClassName)}
      classNames={className}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeftIcon className="h-4 w-4" {...props} />;
          } else {
            return <ChevronRightIcon className="h-4 w-4" {...props} />;
          }
        },
      }}
      modifiers={{
        available: (date) =>
          availableDates?.some(
            (availableDate) =>
              new Date(availableDate * 1000).toDateString() ===
              date.toDateString(),
          ),
      }}
      modifiersClassNames={{
        available: cn(
          "bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:hover:text-white text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50",
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
