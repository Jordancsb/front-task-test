import { useState } from "react";
import { api } from "../api/intances";

export interface TaskProps {
    title: string;
    description: string;
    image: string;
    alt?: string;
    priority: "low" | "medium" | "high";
    tags: { title: string; bg: string; text: string }[];
    status: "PENDING" | "INPROGRESS" | "COMPLETED";
    deadline: string;
    assignedUserId: number;
}

const useCreateTask = () => {
  const [loading, setLoading] = useState(false);

  async function execute (taskData: TaskProps) {
    setLoading(true);

    try {
      const response = await api.post("/api/task/createTask", {
        ...taskData,
      });

      return response.data;

    } catch (error) {   
        console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
};

export default useCreateTask;
