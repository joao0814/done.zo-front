import api from "./api";
import { type Task } from "../../types";

export const taskService = {
  getTasks: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  createTasks: async (titulo: string, descricao: string) => {
    const response = await api.post("/tasks", { titulo, descricao });
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },

  updateTask: async (id: number, titulo: string, descricao: string) => {
    const response = await api.put(`/tasks/${id}`, { titulo, descricao });
    return response.data;
  },
};
