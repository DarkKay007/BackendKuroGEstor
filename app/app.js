import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// Middleware para habilitar CORS desde cualquier origen
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

export default app;
