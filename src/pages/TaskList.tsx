import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { type Task } from "../types";
import { TaskModal } from "../components/TaskModal";
import { TaskCard } from "../components/TaskCard";
import "../App.css";

function TaskList() {
  const { tasks, loading, loadTasks, createTask, removeTask, updateTask } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (
    titulo: string,
    tipo: string,
    descricao: string,
  ) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, titulo, tipo, descricao);
    } else {
      await createTask(titulo, tipo, descricao);
    }
    setIsModalOpen(false);
  };

  if (loading) return <div className="loading-state">Carregando...</div>;

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">My Tasks</h1>
          <button onClick={handleOpenCreate} className="app-btn-new">
            + Nova Tarefa
          </button>
        </header>

        <div className="tasks-scroll-area">
          <main className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={removeTask}
              />
            ))}
          </main>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
}

export default TaskList;
