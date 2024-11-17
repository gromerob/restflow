require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Autenticación básica con una clave
const API_KEY = process.env.API_KEY || "mi-api-key";

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  console.log(apiKey);
  console.log(API_KEY);
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
});

// Ruta de prueba para el Flow
app.post("/test", (req, res) => {
  const { tipoSolicitud, monto, informacionAdicional } = req.body;

  if (!tipoSolicitud || !monto || !informacionAdicional) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  // Simula una respuesta exitosa con un ID generado
  const idGenerado = Math.floor(Math.random() * 1000000);
  res.json({
    status: "success",
    id: idGenerado,
    message: "Solicitud procesada correctamente",
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
