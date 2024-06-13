import { Router } from 'express'
import { validarPermiso } from '../middlewares/usuarios.middlewares.js';
import { delReunion, postReunion, putReunion, showReuniones,showAllMeetings  } from '../controllers/reuniones.controller.js';

const routerMeeting = Router();


routerMeeting.get("/meetings", showReuniones);
routerMeeting.post("/meeting", postReunion);
routerMeeting.put("/meeting/:reunion_id", putReunion);
routerMeeting.delete("/meeting/:reunion_id", delReunion);
routerMeeting.get('/meetings/all', showAllMeetings); // Nueva ruta para mostrar todas las reuniones


export default routerMeeting;
