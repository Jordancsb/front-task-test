import React, { useState, useEffect } from "react";
import useUpdateTask, { TaskProps } from "../../../hooks/useUpdateTask";
import { useAuth } from "../../../context/AuthContext";


interface ModalUpdateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskProps; 
}

const ModalUpdateTask = ({ isOpen, onClose, task }: ModalUpdateTaskProps) => {
  const { token } = useAuth();
  const [taskData, setTaskData] = useState(task);
  const [tagTitle, setTagTitle] = useState("");
  const { execute } = useUpdateTask();

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      await execute(task.id, taskData, token || '');
      onClose();
    } catch (e) {
      console.error("Error updating task", e);
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
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={taskData.priority}
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="datetime-local"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <button className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium">
          Adicionar Tag
        </button>
        <div className="w-full">
          {taskData.tags.length > 0 && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
          <input
            type="text"
            name="alt"
            value={taskData.alt}
            onChange={handleChange}
            placeholder="Descrição da Imagem"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <button
          className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
          onClick={handleUpdate}
        >
          Atualizar Tarefa
        </button>
      </div>
    </div>
  );
};

export default ModalUpdateTask;
