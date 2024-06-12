import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Configurar CORS para permitir solicitudes desde el dominio de Vercel
app.use(cors({
  origin: 'https://kuro-gestor.vercel.app' // Reemplaza esto con la URL de tu frontend en Vercel
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define rutas
app.use("/", routes);

export default app;
