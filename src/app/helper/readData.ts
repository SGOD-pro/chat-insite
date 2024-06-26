import { DataInterface } from "../page";
export function converToJson(value: string) {
	const regex = /(\d{1,2}\/\d{1,2}\/\d{2}), (\d{1,2}:\d{2}) - ([^:]+): (.*)/g;
	const matches: DataInterface[] = [];
	let match;

	while ((match = regex.exec(value)) !== null) {
		matches.push({
			date: match[1],
			time: match[2],
			name: match[3],
			message: match[4],
		});
	}
	return matches;
}
