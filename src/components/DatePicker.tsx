"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import {  format } from "date-fns";
import { DateRange,SelectRangeEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
interface DatePicker {
	className?: React.HTMLAttributes<HTMLDivElement>;
	date: DateRange|undefined;
	setDate: SelectRangeEventHandler;
}
function DatePickerWithRange({
	className,
	date,
	setDate,
}: DatePicker) {
	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[250px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
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
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
export default React.memo(DatePickerWithRange);