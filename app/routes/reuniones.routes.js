import { Router } from 'express'
import { validarPermiso } from '../middlewares/usuarios.middlewares.js';
import { delReunion, postReunion, putReunion, showReuniones } from '../controllers/reuniones.controller.js';

const routerMeeting = Router();


routerMeeting.get("/meetings", showReuniones);
routerMeeting.post("/meeting", postReunion);
routerMeeting.put("/meeting/:reunion_id", putReunion);
routerMeeting.delete("/meeting/:reunion_id", delReunion);

export default routerMeeting;
