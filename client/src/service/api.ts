import axios from "axios";

const baseUrl = "http://localhost:3001";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar as tarefas:", error);
    throw error;
  }
};

export const createTask = async (taskData: {
  titulo: string;
  concluida: boolean;
}) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    console.log("Erro ao criar a tarefa:", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  taskData: Partial<{ titulo: string; concluida: boolean }>
) => {
  try {
    const response = await api.patch(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.log("Erro ao atualizar a tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao excluir a tarefa:", error);
    throw error;
  }
};
