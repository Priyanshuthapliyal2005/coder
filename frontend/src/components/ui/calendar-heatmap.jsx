import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { addMonths, subMonths, startOfMonth } from "date-fns"; // Import startOfMonth
import { cn } from "@/lib/utils"; // Ensure this is correctly imported or implemented
import { buttonVariants } from "@/components/ui/button"; // Ensure this is correctly imported or implemented

const useModifiers = (variantClassnames, datesPerVariant) => {
  const noOfVariants = variantClassnames.length;
  const variantLabels = Array.from({ length: noOfVariants }, (_, idx) => `__variant${idx}`);

  const modifiers = variantLabels.reduce((acc, key, index) => {
    acc[key] = datesPerVariant[index];
    return acc;
  }, {});

  const modifiersClassNames = variantLabels.reduce((acc, key, index) => {
    acc[key] = variantClassnames[index];
    return acc;
  }, {});

  return [modifiers, modifiersClassNames];
};

const categorizeDatesPerVariant = (weightedDates, noOfVariants) => {
  const sortedEntries = weightedDates.sort((a, b) => a.weight - b.weight);
  const categorizedRecord = Array.from({ length: noOfVariants }, () => []);

  const minNumber = sortedEntries[0].weight;
  const maxNumber = sortedEntries[sortedEntries.length - 1].weight;
  const range = (maxNumber - minNumber) / noOfVariants;

  sortedEntries.forEach((entry) => {
    const category = Math.min(
      Math.floor((entry.weight - minNumber) / range),
      noOfVariants - 1
    );
    categorizedRecord[category].push(entry.date);
  });

  return categorizedRecord;
};

const CalendarHeatmap = ({
  variantClassnames,
  datesPerVariant = null,
  weightedDates = [],
  className = "",
  classNames = {},
  showOutsideDays = true,
  viewType = "month", // Add viewType prop
  ...props
}) => {
  const noOfVariants = variantClassnames.length;

  datesPerVariant = datesPerVariant ?? categorizeDatesPerVariant(weightedDates, noOfVariants);

  const [modifiers, modifiersClassNames] = useModifiers(variantClassnames, datesPerVariant);

  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today); // Ensure the range ends at the start of the current month
  const firstMonth = viewType === "year" ? subMonths(startOfCurrentMonth, 11) : startOfCurrentMonth; // Adjust to show the last 12 months
  const numberOfMonths = viewType === "year" ? 12 : 1;

  return (
    <DayPicker
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: (props) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      fromMonth={firstMonth}
      toMonth={startOfCurrentMonth} // Ensure the range ends with the current month
      numberOfMonths={numberOfMonths}
      {...props}
    />
  );
};

CalendarHeatmap.displayName = "CalendarHeatmap";

export { CalendarHeatmap };
