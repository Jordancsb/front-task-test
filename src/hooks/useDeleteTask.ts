import { useState } from "react";
import { api } from "../api/intances";

export interface TaskProps {
    title: string;
    description: string;
    image: string;
    alt?: string;
    priority: "low" | "medium" | "high";
    tags: { title: string; bg: string; text: string }[];
    status: string | null;
    deadline: string;
    assignedUserId: number;
}

const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);

  async function execute(id: number) {
    setLoading(true);

    try {
      const response = await api.delete(`/api/task/${id}`);

      return response.data;

    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  }

  return { execute, loading };
};

export default useUpdateTask;
