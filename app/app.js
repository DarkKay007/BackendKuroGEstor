import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const allowedOrigins = ['https://front-end-gestor-vercel.vercel.app'];

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200  // Para navegadores antiguos que no manejan bien el 204
};

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Middleware para manejar las solicitudes OPTIONS
app.options('*', cors(corsOptions));

// Configurar encabezados para todas las respuestas
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

const PORT = process.env.PORT || 3000; // Changed fallback port to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
