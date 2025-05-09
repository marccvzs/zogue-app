"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{ width: "248.8px" }}
      classNames={{
        months: "flex relative",
        month: "w-full",
        month_caption: "relative mx-10 flex h-7 items-center justify-center",
        caption_label: "truncate text-sm font-medium",
        nav: "flex items-start",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_previous: cn("absolute left-0 opacity-80 hover:opacity-100", className),
        button_next: cn("absolute right-0 opacity-80 hover:opacity-100", className),
        month_grid: "mx-auto mt-4",
        head_row: "flex",
        weekday: cn("w-8 text-sm font-normal text-muted-foreground", className),
        weekdays: cn("flex flex-row", className),
        week: "flex w-max items-start mt-2",
        day: "flex size-8 flex-1 items-center justify-center p-0 text-sm",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start rounded-s-md",
        day_range_end: "day-range-end rounded-e-md",
        selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
          className
        ),
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
        hidden: "invisible flex-1",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="size-4" />
          }
          return <ChevronRight className="size-4" />
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
