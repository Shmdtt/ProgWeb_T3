function texto(valor) {
    return typeof valor === 'string' ? valor.trim() : '';
}

function somenteDigitos(valor) {
    return String(valor).replace(/\D/g, '');
}

function cpfValido(cpf) {
    const d = somenteDigitos(cpf);
    if (d.length !== 11) return false;

    return true;
}

function emailValido(email) {
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return formato.test(String(email).trim());
}

function cepValido(cep) {
    const numeros = somenteDigitos(cep);

    if (numeros.length === 0) return true;

    return numeros.length === 8;
}

function validarDivida(dados) {
    const erros = [];

    if(texto(dados.nome) === '') {
        erros.push('O campo nome é obrigatório.');
    }

    if(!cpfValido(dados.cpf)) {
        erros.push('O campo CPF é obrigatório.');
    }

    if(!emailValido(dados.email)) {
        erros.push('O campo email é obrigatório.');
    }

    if(texto(dados.descricao) === '') {
        erros.push('O campo descrição é obrigatório.');
    }
    const valor = Number(texto(dados.valor));

    if(texto(dados.valor) === '' || Number.isNaN(valor) || valor <= 0) {
        erros.push('O campo valor é obrigatório e deve ser um número maior que zero.');
    }

    if(!['Pendente', 'Pago'].includes(dados.situacao)) {
        erros.push('Situação deve ser "Pendente" ou "Pago".');
    }

    return erros;
}

module.exports = {
    validarDivida,
    somenteDigitos,
    texto,
};