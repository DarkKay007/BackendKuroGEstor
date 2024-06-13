import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importaciones de las rutas
import routerUsers from './routes/usuarios.routes.js';
import routerProjects from './routes/proyectos.routes.js';
import routerTasks from './routes/tareas.routes.js';
import routerMeeting from './routes/reuniones.routes.js';

const app = express();

// Middleware para parsear JSON y URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura cookie-parser
app.use(cookieParser());

// Configuración de CORS
const corsOptions = {
  origin: 'https://kuro-gestor-iheilkmqv-darkkay007s-projects.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplicar middleware de CORS globalmente
app.use(cors(corsOptions));

// Aplicar middleware de CORS a las rutas específicas
app.use('/api/tasks', cors(corsOptions), routerTasks);
app.use('/api/meetings', cors(corsOptions), routerMeeting);
app.use('/api/users', cors(corsOptions), routerUsers);
app.use('/api/projects', cors(corsOptions), routerProjects);

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
