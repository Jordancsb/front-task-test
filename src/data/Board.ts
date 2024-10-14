import { Columns } from "../types";

export type TaskT = {
	id: number;
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	deadline: number;
	image: string;
	alt?: string;
	tags: { title: string; bg: string; text: string }[];
	status: "PENDING" | "INPROGRESS" | "COMPLETED";
	assignedUserId: number;
};

export const initialColumns: Columns = {
	backlog: {
		name: "Backlog",
		items: [],
	},
	pending: {
		name: "Pending",
		items: [],
	},

}