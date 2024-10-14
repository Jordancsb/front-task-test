import { useState } from "react";
import { api } from "../api/intances";

export interface TaskProps {
    id: number;
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

  async function execute(id: number, taskData: TaskProps, token: string) {
    setLoading(true);

    try {
      const response = await api.put(`/api/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        window.location.reload();
      }

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
