const express = require("express");
const MainRouter = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware para habilitar CORS
app.use(cors()); // Permite solicitudes de diferentes orígenes

// Middleware para registrar las solicitudes HTTP en la consola
app.use(morgan("dev")); // Registra información de las solicitudes en formato 'dev'

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json()); // Permite que el servidor entienda datos JSON en las solicitudes

// Enrutador principal definido en el archivo de rutas
app.use(MainRouter); // Monta el enrutador en la aplicación

module.exports = app;
