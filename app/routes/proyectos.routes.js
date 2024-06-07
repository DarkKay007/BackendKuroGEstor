import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, putProject, showProject } from "../controllers/proyectos.controllers.js";

const routerProjects = Router();

routerProjects.get("/proyectos",  showProject);
routerProjects.get("/proyecto/:nombre",  getProject);
routerProjects.post("/proyecto",  postProject);
routerProjects.put("/proyecto",  putProject);
routerProjects.delete("/proyecto/:nombre",   delProject);

export default routerProjects;
