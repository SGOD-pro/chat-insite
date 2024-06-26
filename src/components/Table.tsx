import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import DatePickerWithRange from "./DatePicker";
import { DataInterface } from "@/app/page";
import React, { memo, useEffect, useState } from "react";
function TableDemo({ data }: { data: DataInterface[] }) {
	const [showData, setshowData] = useState<DataInterface[]>([]);

	const [date, setDate] = React.useState<DateRange | undefined>(undefined);
	const [time, setTime] = React.useState<any>();
	const [name, setName] = useState<string>();

	const throttle = <T extends unknown[]>(
		func: (...args: T) => void,
		delay: number
	) => {
		let timeoutId: NodeJS.Timeout | undefined;
		return (...args: T) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	const queryResult = () => {
		if (name?.trim()) {
		  const escapedInput = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
		  const regexPattern = new RegExp(`\\b${escapedInput}\\b`, "i");
	  
		  const results = data.filter((item) => {
			const matchesName = regexPattern.test(item.name);
			const matchesTime = time ? time >= item.time : true;
			const matchesDate = date && date.to && date.from ? (() => {
			  const itemDate = new Date(item.date).getTime();
			  const fromDate = new Date(date.from).getTime();
			  const toDate = new Date(date.to).getTime();
			  return itemDate >= fromDate && itemDate <= toDate;
			})() : true;
			return matchesName && matchesTime && matchesDate;
		  });
	  
		  setshowData(results);
		  console.log(results);
		} else if (date && date.to && date.from) {
		  const fromDate = new Date(date.from).getTime();
		  const toDate = new Date(date.to).getTime();
	  
		  const results = data.filter((item) => {
			const itemDate = new Date(item.date).getTime();
			const matchesTime = time ? time >= item.time : true;
			return itemDate >= fromDate && itemDate <= toDate && matchesTime;
		  });
	  
		  setshowData(results);
		  console.log(results);
		} else if (time) {
		  const results = data.filter((item) => time >= item.time);
		  setshowData(results);
		  console.log(results);
		} else {
		  setshowData(data);
		}
	  };
	  
	const throttledQueryResult = throttle(queryResult, 650);
	const searchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	useEffect(() => {
		console.log("hiii");
		throttledQueryResult();
		console.log(time);
	}, [name, date, time]);
	useEffect(() => {
		setshowData(data);
	}, [data]);

	return (
		<Table className="min-w-96 scrollbar relative">
			<TableCaption>Your all group chats</TableCaption>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead className="min-w-[200px]">
						<Input
							type="text"
							className="m-0"
							placeholder="Seach by sender"
							value={name}
							onChange={searchByName}
							disabled={data.length === 0}
						/>
					</TableHead>
					<TableHead>
						<div className="w-[240px]">
							<DatePickerWithRange date={date} setDate={setDate} />
						</div>
					</TableHead>
					<TableHead>
						<div className="max-w-36 min-w-28">
							<Input
								type="time"
								onChange={(e) => {
									setTime(e.target.value);
								}}
								value={time}
							/>
						</div>
					</TableHead>
					<TableHead className="text-right w-screen sm:w-[250px] sm:max-w-[280px]">
						<Button
							variant={"outline"}
							size={"icon"}
							onClick={() => {
								setshowData(data);
								setDate(undefined)
								setTime("")
							}}
							className="sticky top-0 right-0"
						>
							<ReloadIcon />
						</Button>
					</TableHead>
				</TableRow>
				<TableRow>
					<TableHead className=" pl-4 w-[200px]">Sender</TableHead>
					<TableHead className="pl-4 w-[240px]">Date</TableHead>
					<TableHead className=" pl-4 w-[150px]">Time</TableHead>
					<TableHead className="">Message</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{showData.map((item, index) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.name}</TableCell>
						<TableCell>{item.date}</TableCell>
						<TableCell>{item.time}</TableCell>
						<TableCell className="">{item.message}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
export default TableDemo;
