"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { UploadIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Table from "@/components/Table";
import { useRef, useState, useCallback, useEffect } from "react";
export interface DataInterface {
	name: string;
	time: string;
	date: string;
	message: string;
}
import { converToJson } from "@/app/helper/readData";
export default function Home() {
	const [data, setData] = useState<DataInterface[] | null>(null);
	const fileInput = useRef<HTMLInputElement>(null);

	const [showIcon, setShowIcon] = useState(false);
	const mainRef = useRef<HTMLElement>(null);
	const FileRead = useCallback(() => {
		if (
			fileInput.current &&
			fileInput.current.files &&
			fileInput.current.files.length > 0
		) {
			const selectedFile = fileInput.current.files[0];

			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target && typeof event.target.result === "string") {
					setData(converToJson(event.target.result));
				}
			};
			reader.readAsText(selectedFile);
		}
	}, []);
	const handleScroll = () => {
		if (mainRef.current && mainRef.current.scrollTop >= window.innerHeight) {
			setShowIcon(true);
		} else {
			setShowIcon(false);
		}
	};
	useEffect(() => {
		const mainElement = mainRef.current;
		if (!mainElement) {
			return;
		}
		mainElement.addEventListener("scroll", handleScroll);

		// Clean up the event listener when component unmounts
		return () => {
			mainElement.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		if (!mainRef.current) {
			return;
		}
		mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<>
			<main className="h-screen scrollbar overflow-auto pb-10" ref={mainRef}>
				{showIcon&&<Button
					variant={"outline"}
					size={"icon"}
					className="fixed bottom-5 right-10 z-20"
					onClick={scrollToTop}
				>
					<ArrowUpIcon/>
				</Button>}
				<div className="container mt-6 w-full lg:w-3/4 px-2 lg:p-5">
					<div className="grid w-full sm:max-w-sm items-center gap-1.5 rounded-lg border lg:p-5  p-2">
						<div className="">
							<Label htmlFor="picture">Chat .txt file</Label>
							<Input id="picture" type="file" accept=".txt" ref={fileInput} />
							<div className="text-right mt-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={"outline"}
												size={"icon"}
												className=""
												onClick={() => {
													FileRead();
												}}
											>
												<UploadIcon />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Upload</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</div>
					<div className="border rounded-lg lg:p-3 mt-4 p-2 overflow-hidden">
						<div className="overflow-x-auto w-full scrollbar">
							<Table data={data || []} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
