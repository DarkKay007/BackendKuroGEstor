import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delTask, getTask, postTask, putTask, showTasks } from "../controllers/tareas.controllers.js";
const routerTasks = Router();

routerTasks.get("/tasks", showTasks );
routerTasks.get("/task/:nombre", getTask);
routerTasks.post("/task", postTask);
routerTasks.put("/task", putTask);
routerTasks.delete("/task/:nombre", delTask);

export default routerTasks;
