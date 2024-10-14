import useDeleteTask from "../../../hooks/useDeleteTask";

interface ModalDeleteTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: number;
}

const ModalDeleteTask = ({ isOpen, onClose, taskId }: ModalDeleteTaskProps) => {
  const { execute } = useDeleteTask();

  const handleDelete = async () => {
    try {
      await execute(taskId);
      onClose();
    } catch (e) {
      console.error("Error deleting task", e);
    }
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={onClose}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <h2 className="text-lg font-medium">Tem certeza que deseja deletar a tarefa?</h2>
        <div className="w-full flex justify-between">
          <button
            className="w-[45%] rounded-md h-9 bg-red-500 text-white font-medium"
            onClick={handleDelete}
          >
            Deletar
          </button>
          <button
            className="w-[45%] rounded-md h-9 bg-gray-300 text-black font-medium"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTask;
