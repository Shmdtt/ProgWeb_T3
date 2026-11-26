function texto(valor) {
    return typeof valor === 'string' ? valor.trim() : '';
}

function somenteDigitos(valor) {
    return String(valor).replace(/\D/g, '');
}

function cpfValido(cpf) {
    const d = somenteDigitos(cpf);

    return d.length === 11;
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

    if (texto(dados.nome) === '') {
        erros.push('O campo nome é obrigatório.');
    }

    if (texto(dados.cpf) === '') {
        erros.push('O CPF é obrigatório.');
    } else if (!cpfValido(dados.cpf)) {
        erros.push('O CPF deve conter 11 dígitos.');
    }

    if (!emailValido(dados.email)) {
        erros.push('O campo email é obrigatório.');
    }

    if (!cepValido(dados.cep)) {
        erros.push('O CEP deve conter 8 dígitos.');
    }

    if (texto(dados.descricao) === '') {
        erros.push('O campo descrição é obrigatório.');
    }
    const valor = Number(texto(dados.valor));

    if (texto(dados.valor) === '' || Number.isNaN(valor) || valor <= 0) {
        erros.push('O campo valor é obrigatório e deve ser um número maior que zero.');
    }

    if (!['Pendente', 'Pago'].includes(dados.situacao)) {
        erros.push('Situação deve ser "Pendente" ou "Pago".');
    }

    return erros;
}

module.exports = {
    validarDivida,
    somenteDigitos,
    texto,
};