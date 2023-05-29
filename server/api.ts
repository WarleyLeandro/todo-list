import express, { Request, Response } from "express";

interface Task {
  id: number;
  titulo: string;
  concluida: boolean;
}

const tasks: Task[] = [
  { id: 1, titulo: "Aprender React", concluida: true },
  { id: 2, titulo: "Estudar NodeJS", concluida: false },
  { id: 3, titulo: "Praticar TypeScript", concluida: false },
];

const app = express();
app.use(express.json());

app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const newTask: Task = req.body;
  tasks.push(newTask);
  res.sendStatus(201);
});

app.patch("/tasks/:id", (req: Request, res: Response) => {
  const taskId: number = parseInt(req.params.id);
  const updatedTask: Task = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const taskId: number = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3001, () => {
  console.log("Server rodando em http://localhost:3001");
});
