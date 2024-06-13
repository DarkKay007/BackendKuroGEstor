import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

// Crea una instancia de Express
const app = express();

// Configura las opciones CORS
const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Usa el middleware de CORS
app.use(cors(corsOptions));

// Middleware para parsear JSON y URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de tu aplicación
app.use('/', routes);

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Middleware personalizado para agregar cabecera Allow-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://kuro-gestor.vercel.app');
  next();
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporta la aplicación para poder utilizarla en otros archivos
export default app;
