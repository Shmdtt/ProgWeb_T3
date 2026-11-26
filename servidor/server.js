const express = require('express');
const cors = require('cors');
const path = require('path');
const dividasRouter = require('./src/routes/dividas');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor do sistema de dívidas funcionando!');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/dividas', dividasRouter);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
    res.status(500).json({ erro: erro.message });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});