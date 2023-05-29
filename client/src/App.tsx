import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./service/api";
import "./styles.css";

interface Task {
  id: number;
  titulo: string;
  concluida: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const taskData = await fetchTasks();
      console.log("taskdata ===>", taskData);
      setTasks(taskData);
    } catch (error) {
      console.log("Erro ao buscar as tarefas:", error);
    }
  };

  const createNewTask = async () => {
    try {
      const newTaskData = await createTask({
        titulo: newTask,
        concluida: false,
      });
      const newTaskWithId = { ...newTaskData, id: newTaskData.id };

      setTasks([...tasks, newTaskWithId]);
      setNewTask("");
    } catch (error) {
      console.log("Erro ao criar a tarefa:", error);
    }
  };

  const toggleTaskStatus = async (taskId: number, currentStatus: boolean) => {
    try {
      await updateTask(taskId, { concluida: !currentStatus });
      fetchTaskData();
    } catch (error) {
      console.log("Erro ao atualizar a tarefa:", error);
    }
  };

  const removeTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTaskData();
    } catch (error) {
      console.log("Erro ao excluir a tarefa:", error);
    }
  };

  return (
    <div className="container">
      <h1>Minhas tarefas</h1>
      <div className="box-list">
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.id}>
              <span
                className="task-title"
                style={{
                  textDecoration: task.concluida ? "line-through" : "none",
                }}
              >
                {task.titulo}
              </span>
              <span>
                <button
                  className="task-status"
                  onClick={() => toggleTaskStatus(task.id, task.concluida)}
                >
                  {task.concluida ? "Desfazer" : "Concluir"}
                </button>
                <button
                  className="task-delete"
                  onClick={() => removeTask(task.id)}
                >
                  Excluir
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <input
        className="task-input"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <button className="add-button" onClick={createNewTask}>
        Adicionar
      </button>
    </div>
  );
};

export default App;
