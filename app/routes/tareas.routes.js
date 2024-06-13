import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delTask, getTask, postTask, putTask, showTasks } from "../controllers/tareas.controllers.js";
const routerTasks = Router();
import cors from 'cors';
const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
routerTasks.get("/tasks", cors(corsOptions), validarPermiso, showTasks );
routerTasks.get("/task/:nombre", cors(corsOptions), validarPermiso, getTask);
routerTasks.post("/task", cors(corsOptions), validarPermiso, postTask);
routerTasks.put("/task", cors(corsOptions), validarPermiso, putTask);
routerTasks.delete("/task/:nombre", cors(corsOptions), validarPermiso, delTask);

export default routerTasks;
