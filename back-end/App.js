const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER,Content-Type, Authorization',
  );
  app.use(cors());
  next();
});

app.get('/', (req, res) => {
  res.send('Olas mundo...');
});
const server = app.listen(8080, () => {
  console.log('Rodando...');
});

io = socket(server, { cors: { origin: '*' } });

io.on('Connection', (socket) => {
  console.log(socket.id);
});
