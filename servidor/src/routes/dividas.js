const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const {validarDivida, somenteDigitos, texto} = require('../validacao');
const {lerDados, salvarDados} = require('../armazenamento');

const router = express.Router();
const PASTA_UPLOADS = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
    destination: PASTA_UPLOADS,
    filename: (req, file, cb) => cb(null, crypto.randomUUID() + '.pdf'),
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('PDF_INVALIDO'));
        }
        cb(null, true);
    },
});

function receberComprovante(req, res, next) {
    upload.single('comprovante')(req, res, (erro) => {
        if(!erro) return next();

        let mensagem = 'Erro ao enviar o arquivo.';
        if(erro.code === 'LIMIT_FILE_SIZE') mensagem = 'o PDF dever ter no máximo 5MB.';
        if(erro.message === 'PDF_INVALIDO') mensagem = 'o arquivo deve ser um PDF.';

        res.status(400).json({ erros: 'Dados inválidos', detalhes: [mensagem] });
    });
}

router.get('/', async (req, res) => {
    const dividas = await lerDados();
    res.status(200).json(dividas);
});

router.post('/', receberComprovante, async (req, res) => {
    const dados = req.body || {};
    const erros = validarDivida(dados);

    if(erros.length > 0) {
        if(req.file) await fs.unlink(req.file.path);
        res.status(400).json({ erros: 'Dados inválidos', detalhes: erros });
        return;
    }

    const divida = {
    id: crypto.randomUUID(),
    nome: texto(dados.nome),
    cpf: somenteDigitos(dados.cpf),
    email: texto(dados.email),
    valor: Number(dados.valor),
    descricao: texto(dados.descricao),
    situacao: dados.situacao,
    cep: somenteDigitos(dados.cep),
    numero: texto(dados.numero),
    complemento: texto(dados.complemento),
    processo: texto(dados.processo),
    comprovante: req.file ? req.file.filename : null,
    }

    const dividas = await lerDados();
    dividas.push(divida);
    await salvarDados(dividas);

    res.status(201).json(divida);
});

router.delete('/:id', async (req, res) => {
    const dividas = await lerDados();
    const indice = dividas.findIndex(d => d.id === req.params.id);

    if(indice === -1) {
        res.status(404).json({ erro: 'Dívida não encontrada' });
        return;
    }

    const [removida] = dividas.splice(indice, 1);
    await salvarDados(dividas);

    if(removida.comprovante) {
        await fs.unlink(path.join(PASTA_UPLOADS, removida.comprovante)).catch(() => {});
    }

    res.status(200).json({ mensagem: 'Dívida removida com sucesso', id: removida.id });

});

module.exports = router;

