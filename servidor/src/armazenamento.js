const fs = require('fs/promises');
const path = require('path');

const ARQUIVO = path.join(__dirname, '..', 'data', 'dados.json');

async function lerDados() {
    try {
        const conteudo = await fs.readFile(ARQUIVO, 'utf-8');
        if (conteudo.trim() === ''){
            return []
        }
        return JSON.parse(conteudo);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            return [];
        }
        throw erro;
    }
}

async function salvarDados(dados) {
    await fs.mkdir(path.dirname(ARQUIVO), { recursive: true });
    await fs.writeFile(ARQUIVO, JSON.stringify(dados, null, 2), 'utf-8');
}

module.exports = {
    lerDados,
    salvarDados,
};