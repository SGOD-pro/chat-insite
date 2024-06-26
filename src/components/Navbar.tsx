"use client";
import ThemeSwitch from "@/components/ThemeSwitch";
import AlertDialog from "@/components/AlertDialog";
function Navbar() {
	console.log("navbar")
	return (
		<nav className="flex items-center justify-between px-4 py-2 border-b sticky top-0 bg-gray-200/30 dark:bg-black/30 backdrop-blur-sm z-10">
			<div className=" flex items-center">
				<h1 className="text-3xl font-semibold">ChatInsights</h1>
			</div>

			<div className="flex items-center gap-4">				
				<AlertDialog />
				<ThemeSwitch />
			</div>
		</nav>
	);
}

export default Navbar;
