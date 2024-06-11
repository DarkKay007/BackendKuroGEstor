import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Specify the allowed origin
  methods: 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  credentials: true, // Allow credentials
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight requests
app.options('*', cors(corsOptions));

// Middleware to set headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

export default app;
