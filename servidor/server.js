const express = require('express');
const cors = require('cors');
const dividasRouter = require('./src/routes/dividas');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ mensagem: 'Servidor funcionando!' });
});

app.use('/dividas', dividasRouter);


app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});


app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(erro.status || 500).json({ erro: 'Erro interno do servidor.' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});