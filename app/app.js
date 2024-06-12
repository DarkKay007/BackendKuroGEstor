import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Configurar CORS
app.use(cors());

// Opcional: permitir solo ciertos orígenes
// app.use(cors({
//   origin: 'https://kuro-gestor.vercel.app'
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define rutas
app.use("/", routes);

export default app;
