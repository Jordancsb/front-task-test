import { useState } from "react";
import { api } from "../api/intances";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

interface UpdateTaskStatusProps {
  taskId: number;
  status: string;
}

export const useUpdateTaskStatus = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

   async function execute ({ taskId, status }: UpdateTaskStatusProps) {
    setLoading(true);

    try {
      const response = await api.patch(`/api/tasks/${taskId}/status`, {
        status,
        token: token,
      });

      if (response.status === 200) {
        toast.success("Task status updated successfully");
        return response.data;
      } else {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      toast.error("Failed to update task status");
      console.error("Error updating task status:", error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
};
