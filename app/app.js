import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  preflightContinue: true
};
app.options('*', cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://kuro-gestor.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors(corsOptions)); // Use the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.options('/api/tasks/*', cors(corsOptions));
app.options('/api/meetings/*', cors(corsOptions));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
