import { useState } from "react";
import { api } from "../api/intances";

export interface Task {
  id: number;
  title: string;
  description: string;
  image: string;
  alt?: string;
  priority: "low" | "medium" | "high";
  tags: { title: string; bg: string; text: string }[];
  status: "PENDING" | "INPROGRESS" | "COMPLETED";
  deadline: number;
  assignedUserId: number;
}

export default function useListTasks() {
  const [loading, setLoading] = useState<boolean>(false);

 async function execute(token: string, status?: string) {

    try {
      setLoading(true);

      const response = await api.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: status,
        },
      });

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }

  }
  return { execute, loading };
}
