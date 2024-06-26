import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { QuestionMarkIcon } from "@radix-ui/react-icons";

export default function AlertDialogDemo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					<QuestionMarkIcon className="text-2xl" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>How to use?</AlertDialogTitle>
					<AlertDialogDescription>
						<ul className="list-disc list-inside">
							<li className="mb-2">
								<span className="font-semibold">Step 1:</span> Open the WhatsApp
								group chat.
							</li>
							<li className="mb-2">
								<span className="font-semibold">Step 2:</span> Click on the menu
								(three dots) in the top right corner.
							</li>
							<li className="mb-2">
								<span className="font-semibold">Step 3:</span> Select{" "}
								<strong>More</strong>.
							</li>
							<li className="mb-2">
								<span className="font-semibold">Step 4:</span> Click on{" "}
								<strong>Export chat</strong>.
							</li>
							<li className="mb-2">
								<span className="font-semibold">Step 5:</span> Choose{" "}
								<strong>Without media</strong> to export the chat without
								attachments.
							</li>
						</ul>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
