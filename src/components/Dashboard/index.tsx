import { useEffect, useState } from "react";
import { EllipsisHorizontal } from "react-ionicons";
import useListTasks from "../../hooks/useListTasks";
import { TaskT } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useUpdateTaskStatus } from "../../hooks/usePatchStatus";
import ModalUpdateTask from "../Modals/updateModal";
import ModalDeleteTask from "../Modals/deleteModal";

const Dashboard = () => {
  const { token } = useAuth();
  const { execute, loading } = useListTasks();
  const { execute: updateStatus } = useUpdateTaskStatus();
  const [tasks, setTasks] = useState<TaskT[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskT | null>(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);

  const [statusCounters, setStatusCounters] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const task = await execute(token || "", "PENDING");
      setTasks(task);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const pending = tasks.filter((task) => task.status === "PENDING").length;
      const inProgress = tasks.filter(
        (task) => task.status === "INPROGRESS"
      ).length;
      const completed = tasks.filter(
        (task) => task.status === "COMPLETED"
      ).length;

      setStatusCounters({ pending, inProgress, completed });
    }
  }, [tasks]);

  const handleEditTask = (task: TaskT) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskIdToDelete(taskId);
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
    setTaskIdToDelete(null);
  };

  const handleUpdateStatus = async (
    taskId: number,
    newStatus: "PENDING" | "INPROGRESS" | "COMPLETED"
  ) => {
    const updatedTask = await updateStatus({ taskId, status: newStatus });

    setTasks(updatedTask);
  };

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="font-bold text-xl">Pending</h3>
          <p className="text-2xl">{statusCounters.pending}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="font-bold text-xl">In Progress</h3>
          <p className="text-2xl">{statusCounters.inProgress}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="font-bold text-xl">Completed</h3>
          <p className="text-2xl">{statusCounters.completed}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm">
        <h3 className="font-bold text-xl mb-4">Lista de Tarefas</h3>
        {tasks.map((task: TaskT) => (
          <div
            key={task.id}
            className="flex justify-between items-center mb-4 p-3 bg-gray-100 rounded-lg shadow-sm"
          >
            <div>
              <h4 className="font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Prazo: {new Date(task.deadline).toLocaleDateString()}
              </p>
              <p
                className={`text-sm ${
                  task.status === "PENDING"
                    ? "text-yellow-500"
                    : task.status === "INPROGRESS"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                Status: {task.status}
              </p>
            </div>
            <div className="relative">
              <EllipsisHorizontal
                color="#555"
                width="30px"
                height="30px"
                onClick={() =>
                  document
                    .getElementById(`menu-${task.id}`)
                    ?.classList.toggle("hidden")
                }
              />
              <div
                id={`menu-${task.id}`}
                className="hidden absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-10"
              >
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => handleEditTask(task)}
                >
                  Editar
                </button>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Deletar
                </button>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => handleUpdateStatus(task.id, "COMPLETED")}
                >
                  Marcar como Concluída
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTask && (
        <ModalUpdateTask
          isOpen={modalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      )}

      {taskIdToDelete && (
        <ModalDeleteTask
          isOpen={modalDeleteOpen}
          onClose={handleCloseDeleteModal}
          taskId={taskIdToDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
