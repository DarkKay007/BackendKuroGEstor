import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, putProject, showProject } from "../controllers/proyectos.controllers.js";
import cors from 'cors';

const routerProjects = Router();
const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  preflightContinue: true
};
routerProjects.get("/proyectos", cors(corsOptions),validarPermiso ,  showProject);
routerProjects.get("/proyecto/:nombre", cors(corsOptions),validarPermiso ,  getProject);
routerProjects.post("/proyecto", cors(corsOptions),validarPermiso ,  postProject);
routerProjects.put("/proyecto", cors(corsOptions),validarPermiso ,  putProject);
routerProjects.delete("/proyecto/:nombre", cors(corsOptions),validarPermiso ,   delProject);

export default routerProjects;
