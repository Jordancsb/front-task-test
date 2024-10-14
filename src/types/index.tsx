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
  
  type Column = {
	name: string;
	items: TaskT[];
  };
  
  export type Columns = {
	[key: string]: Column;
  };
  