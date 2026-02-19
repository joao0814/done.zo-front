import { useCallback, useState } from "react";
import { type Task } from "../types";
import { taskService } from "../assets/services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (titulo: string, descricao: string) => {
    const newTask = await taskService.createTasks(titulo, descricao);
    setTasks((prev) => [...prev, newTask.task]);
  };

  const removeTask = async (id: number) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = async (id: number, titulo: string, descricao: string) => {
    const updated = await taskService.updateTask(id, titulo, descricao);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updated.task : task)),
    );
  };

  return { tasks, loading, loadTasks, createTask, removeTask, updateTask };
};
