import api from "./api";
import { type Task } from "../types";

export const taskService = {
  getTasks: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },

  createTasks: async (
    titulo: string,
    tipo: string,
    descricao: string,
    prioridade: string,
    data_limite: string,
    estimativa: number,
  ) => {
    const response = await api.post("/tasks", {
      titulo,
      tipo,
      descricao,
      prioridade,
      data_limite,
      estimativa,
    });
    return response.data;
  },

  updateTask: async (
    id: number,
    titulo: string,
    tipo: string,
    descricao: string,
    prioridade: string,
    data_limite: string,
    estimativa: number,
  ) => {
    const response = await api.put(`/tasks/${id}`, {
      titulo,
      tipo,
      descricao,
      prioridade,
      data_limite,
      estimativa,
    });
    return response.data;
  },
};
