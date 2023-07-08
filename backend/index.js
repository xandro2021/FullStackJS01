import express from "express";

const app = express();

app.use('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(4000, () => {
  console.log('Servidor Funcionando en el puerto 4000');
});
