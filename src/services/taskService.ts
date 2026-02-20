import api from "./api";
import { type Task } from "../types";

export const taskService = {
  getTasks: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  createTasks: async (titulo: string, tipo: string, descricao: string) => {
    const response = await api.post("/tasks", { titulo, tipo, descricao });
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },

  updateTask: async (id: number, titulo: string, tipo: string, descricao: string) => {
    const response = await api.put(`/tasks/${id}`, { titulo, tipo, descricao });
    return response.data;
  },
};
