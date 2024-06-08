import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// Middleware para habilitar CORS desde cualquier origen
app.use(cors({
  origin: 'https://front-end-gestor-vercel.vercel.app',  // Permitir cualquier origen
  credentials: true
}));

// Middleware para manejar las solicitudes OPTIONS
app.options('https://front-end-gestor-vercel.vercel.app', cors());

// Configurar encabezados para todas las respuestas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);


export default app;
