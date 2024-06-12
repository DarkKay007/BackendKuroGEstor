const express = require('express');
const cors = require('cors');
const app = express();

// Configuración básica de CORS
app.use(cors({
  origin: 'https://kuro-gestor.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Otras configuraciones de tu servidor Express
// ...

// Rutas de tu API
// ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
