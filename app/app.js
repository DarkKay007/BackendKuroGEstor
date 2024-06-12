import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow requests from specific origins (replace 'https://kuro-gestor.vercel.app' with your actual frontend URL)
const corsOptions = {
  origin: 'https://kuro-gestor.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Define routes
app.use("/", routes);

export default app;
