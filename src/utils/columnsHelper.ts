import { Columns, TaskT } from "../types";

export const createColumnsFromTasks = (tasks: TaskT[], initialColumns: Columns): Columns => {
  const newColumns = { ...initialColumns };

  Object.keys(newColumns).forEach(columnId => {
    newColumns[columnId].items = [];
  });

  tasks.forEach(task => {
    const status = task.status.toLowerCase();
    if (newColumns[status]) {
      newColumns[status].items.push(task);
    }
  });

  return newColumns;
};
