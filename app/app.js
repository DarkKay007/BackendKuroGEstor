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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

export default app;
