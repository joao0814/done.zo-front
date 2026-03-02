import { useCallback, useState } from "react";
import { type Task } from "../types";
import { taskService } from "../services/taskService";

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

  const createTask = async (
    titulo: string,
    tipo: string,
    descricao: string,
    prioridade: string,
    data_limite: string,
    estimativa: number,
  ) => {
    const newTask = await taskService.createTasks(
      titulo,
      tipo,
      descricao,
      prioridade,
      data_limite,
      estimativa,
    );
    setTasks((prev) => [...prev, newTask.task]);
  };

  const removeTask = async (id: number) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = async (
    id: number,
    titulo: string,
    tipo: string,
    descricao: string,
    prioridade: string,
    data_limite: string,
    estimativa: number,
  ) => {
    const updated = await taskService.updateTask(
      id,
      titulo,
      tipo,
      descricao,
      prioridade,
      data_limite,
      estimativa,
    );

    const updatedTask: Task = updated?.task ??
      updated?.data?.task ?? {
        id,
        titulo,
        tipo,
        descricao,
        prioridade,
        data_limite,
        estimativa,
      };

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task)),
    );

    await loadTasks();
  };

  return { tasks, loading, loadTasks, createTask, removeTask, updateTask };
};
