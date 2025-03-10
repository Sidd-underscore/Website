"use client";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  rootClassName,
  classNames,
  showOutsideDays = true,
  availableDates,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const className = {
    root: cn("", defaultClassNames.root),
    months: cn(props.mode === "range" ? "flex" : "", defaultClassNames.months),
    month: cn(props.mode === "range" ? "mx-2" : "", defaultClassNames.month),
    month_caption: cn(
      "mx-2 mt-2 mb-3 font-medium",
      defaultClassNames.month_caption,
    ),
    caption_label: cn("", defaultClassNames.caption_label),
    nav: cn("", defaultClassNames.nav),

    button_previous: cn(
      buttonVariants({ variant: "ghost" }),
      "absolute p-0 h-7 w-7 right-12 top-4",
      cn("", defaultClassNames.button_previous),
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost" }),
      "absolute p-0 h-7 w-7 right-4 top-4",
      cn("", defaultClassNames.button_previous),
    ),

    month_grid: cn("text-center text-xs", defaultClassNames.month_grid),
    weekdays: cn("text-neutral-400", defaultClassNames.weekdays),
    weekday: cn("", defaultClassNames.weekday),
    week: cn("", defaultClassNames.week),
    day: cn("", defaultClassNames.day),
    day_button: cn(
      buttonVariants({ variant: "secondary" }),
      "opacity-50 group-data-day/available:opacity-100 group-data-day/available:bg-neutral-50 dark:group-data-day/available:bg-neutral-700 group-data-today/today:bg-neutral-300 dark:group-data-today/today:bg-neutral-500 group-data-today/today:opacity-100 hover:group-data-today/today:bg-neutral-300 hover:group-data-today/today:text-black group-data-today/today:text-black h-7 w-7 p-0 m-0.5 text-xs rounded-md group-data-selected/selected:bg-neutral-500! group-data-selected/selected:text-neutral-50! dark:group-data-selected/selected:bg-neutral-50! dark:group-data-selected/selected:text-black! hover:group-data-selected/selected:bg-neutral-400! hover:group-data-selected/selected:text-black!",
      defaultClassNames.day_button,
    ),
    range_start: cn("", defaultClassNames.range_start),
    range_end: cn("", defaultClassNames.range_end),
    selected: cn("group/selected", defaultClassNames.selected),
    today: cn(
      "group/today dark:text-white opacity-100",
      defaultClassNames.today,
    ),
    outside: cn("opacity-25", defaultClassNames.outside),
    disabled: cn("", defaultClassNames.disabled),
    range_middle: cn("", defaultClassNames.range_middle),
    hidden: cn("", defaultClassNames.hidden),
    ...classNames,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", rootClassName)}
      classNames={className}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeftIcon className="size-4" {...props} />;
          } else {
            return <ChevronRightIcon className="size-4" {...props} />;
          }
        },
      }}
      modifiers={{
        available: (date) => {
          if (!availableDates) return true;
          else {
            return availableDates?.some(
              (availableDate) =>
                new Date(availableDate * 1000).toDateString() ===
                date.toDateString(),
            );
          }
        },
      }}
      modifiersClassNames={{
        available: "group/available",
      }}
      {...props}
    />
  );
}

export { Calendar };
