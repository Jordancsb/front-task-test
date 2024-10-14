import { useState } from "react";
import { api } from "../api/intances";
import { toast } from "react-toastify";

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

  async function execute(taskData: TaskProps, token: string) { 
    setLoading(true);

    try {
      const response = await api.post(
        "/api/tasks/createTask",
        { ...taskData },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 201) {
        toast.success("Tarefa criada com sucesso!");
        window.location.reload();
      }

      return response.data;

    } catch (error) {
      console.error("Error creating task:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  }

  return { execute, loading };
};

export default useCreateTask;
