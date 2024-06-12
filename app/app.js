import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const allowedOrigins = ['https://kuro-gestor.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Otro middleware y configuraciones de tu servidor

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

// Escuchar en un puerto específico
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
