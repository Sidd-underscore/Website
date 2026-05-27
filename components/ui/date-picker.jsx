"use client";

import * as React from "react";
import { CalendarClock } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ className, date, setDate, availableDates }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-60 justify-start text-left font-normal",
            !date && "text-neutral-500",
            className,
          )}
        >
          <CalendarClock className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          availableDates={availableDates}
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
  availableDates,
}) {
  return (
    <div className={"grid gap-2"}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-black uppercase tracking-wide md:w-75",
              (!date || date === "removeSearchDateFilter") &&
                "text-neutral-400!",
              className,
            )}
          >
            <CalendarClock className={`mr-2 size-4 ${date?.from ? "text-black" : "text-black/50!"}`} />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="text-black/50!">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            availableDates={availableDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
