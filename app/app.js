import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Usar el middleware de CORS antes de cualquier otra cosa

// Middleware para parsear JSON y URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de tu aplicación
app.use('/', routes);

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Configurar cabeceras CORS en las respuestas
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://kuro-gestor.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
