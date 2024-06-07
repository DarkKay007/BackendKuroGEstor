import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
const app = express();
const express = require('express');
const cors = require('cors');

const allowedOrigins = ['https://front-end-gestor-vercel.vercel.app'];

// Configuración de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200  // Para navegadores antiguos que no manejan bien el 204
}));

// Middleware para manejar las solicitudes OPTIONS
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Configurar encabezados para todas las respuestas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://front-end-gestor-vercel.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});




app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", routes);
export default app;
