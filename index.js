const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const db = require('./database');

app.use(cors());
app.use(express.json());

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

const server = https.createServer(options, app);

// Importa y usa las rutas
const routes = require('./routes');
app.use('/', routes);

// Inicia el servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado en https://localhost:${port}`);
});
