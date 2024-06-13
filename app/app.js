import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  optionsSuccessStatus: 200 // algunos clientes pueden tener problemas con 204
};

// Aplicar el middleware de CORS antes de cualquier otra cosa
app.use(cors(corsOptions));

// Middleware para parsear JSON y URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de tu aplicación
app.use('/', routes);

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
