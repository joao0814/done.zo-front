import api from "./api";
import { type Task } from "../types";

const buildTaskPayload = (params: {
  titulo: string;
  tipo: string;
  descricao: string;
  prioridade: string;
  data_limite: string;
  estimativa: number;
}) => {
  const normalizedDate = params.data_limite?.split("T")[0] ?? "";
  const parsedEstimativa = Number(params.estimativa);

  return {
    titulo: params.titulo,
    tipo: params.tipo,
    descricao: params.descricao,
    prioridade: params.prioridade,
    data_limite: normalizedDate,
    dataLimite: normalizedDate,
    estimativa: Number.isFinite(parsedEstimativa) ? parsedEstimativa : 0,
  };
};

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
    const response = await api.post(
      "/tasks",
      buildTaskPayload({
        titulo,
        tipo,
        descricao,
        prioridade,
        data_limite,
        estimativa,
      }),
    );
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
    const response = await api.put(
      `/tasks/${id}`,
      buildTaskPayload({
        titulo,
        tipo,
        descricao,
        prioridade,
        data_limite,
        estimativa,
      }),
    );
    return response.data;
  },

  getMetrics: async () => {
    const response = await api.get("/tasks/metrics");
    return response.data;
  },
};
