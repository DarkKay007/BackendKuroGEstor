import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors(corsOptions)); // Usar el middleware de CORS antes de cualquier otra cosa

// Middleware para parsear JSON y URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de tu aplicación
app.use('/', routes);

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Iniciar el servidor
const PORT = process.env.PORT || 5000; // Usar el puerto proporcionado por Render o el puerto 5000 como fallback
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
