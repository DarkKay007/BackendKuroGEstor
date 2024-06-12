import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// Middleware to enable CORS for specific origin
app.use(cors({
  origin: 'https://kuro-gestor.vercel.app', // Allow only this origin
  credentials: true
}));

// Middleware to handle OPTIONS requests
app.options('*', cors());

// Setting headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://kuro-gestor.vercel.app'); // Allow only this origin
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

export default app;
