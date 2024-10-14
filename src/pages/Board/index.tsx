/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { AddOutline } from "react-ionicons";
import Task from "../../components/Task";

import { onDragEnd } from "../../utils/onDragEnd";
import { Columns, TaskT } from "../../types";
import { createColumnsFromTasks } from "../../utils/columnsHelper";
import useListTasks from "../../hooks/useListTasks";
import ModalTask from "../../components/Modals/createModal";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { token } = useAuth();
  const { execute, loading } = useListTasks();
  const [tasks, setTasks] = useState<TaskT[]>([]);
  const [columns, setColumns] = useState<Columns>({
    pending: { name: "Pending", items: [] },
    todo: { name: "To Do", items: [] },
    doing: { name: "Doing", items: [] },
    done: { name: "Done", items: [] },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      const task = await execute(token ?? "", "PENDING");
      setTasks(task);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setColumns(
        createColumnsFromTasks(tasks, {
          pending: { name: "Pending", items: [] },
          todo: { name: "To Do", items: [] },
          doing: { name: "Doing", items: [] },
          done: { name: "Done", items: [] },
        })
      );
    }
  }, [tasks]);

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: any) => {
    const newTask: TaskT = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || "medium",
      deadline: taskData.deadline || 50,
      image: taskData.image || "",
      alt: taskData.alt || "task image",
      tags: taskData.tags || [],
      status: "PENDING",
      assignedUserId: 1,
    };

    const newColumns = {
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: [...columns[selectedColumn].items, newTask],
      },
    };
    setColumns(newColumns);
    closeModal();
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div className="w-full flex flex-col gap-0 items-center group" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: any) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: any) => (
                          <>
                            <Task provided={provided} task={task} />
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div
                onClick={() => openModal(columnId)}
                className="hidden group-hover:flex cursor-pointer items-center justify-center gap-1 py-[10px] w-full md:w-[290px] w-[250px] opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px] transition-opacity duration-300"
                >
                <AddOutline color={"#555"} />
                Adicionar Tarefa
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <ModalTask
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
