import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware personalizado para manejar CORS
app.use((req, res, next) => {
  // Permitir solicitudes desde cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Permitir los métodos de solicitud que se utilizarán
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Permitir ciertos encabezados personalizados
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Permitir que el navegador envíe cookies en la solicitud
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Si es una solicitud OPTIONS, enviar una respuesta exitosa inmediatamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Pasar al siguiente middleware
  next();
});

// Define rutas
app.use("/", routes);

export default app;
