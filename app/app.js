import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true
};

app.use(cors(corsOptions)); // Use the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
