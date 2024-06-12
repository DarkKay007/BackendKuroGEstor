import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

// Crea una instancia de Express
const app = express();

// Lista de orígenes permitidos (tu frontend desplegado en Vercel)
const allowedOrigins = ['https://kuro-gestor.vercel.app'];

// Opciones de CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Habilita el envío de cookies y otros credenciales
};

// Habilita CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para manejar las solicitudes OPTIONS
app.options('*', cors(corsOptions));

// Middleware para establecer cabeceras en todas las respuestas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Establece el origen dinámicamente
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Middleware para manejar datos JSON y URL codificados
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usa las rutas definidas
app.use("/", routes);

// Exporta la instancia de la aplicación Express
export default app;
