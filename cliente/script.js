
const DIVIDAS = 'http://localhost:3000/dividas';
const CHAVE_LOCAL = 'dividas';

const elementoLista = document.getElementById('lista-dividas');
const mensagem = document.getElementById('mensagem');

// Buscar dívidas no servidor
async function carregarDividas() {
  try {
    const resposta = await fetch(DIVIDAS);

    if (!resposta.ok) {
      throw new Error('Erro ao buscar dívidas');
    }

    const dividas = await resposta.json();

    localStorage.setItem(CHAVE_LOCAL, JSON.stringify(dividas));

    mostrarDividas(dividas);

  } catch (erro) {
    console.log(erro);

    const dadosLocais = localStorage.getItem(CHAVE_LOCAL);

    if (dadosLocais !== null) {
      const dividas = JSON.parse(dadosLocais);

      mostrarDividas(dividas);
      mensagem.textContent = 'Servidor indisponível, mostrando dados salvos no navegador.';
    } else {
      elementoLista.textContent = 'Não foi possível carregar as dívidas.';
      mensagem.textContent = 'Servidor indisponível e nenhum dado salvo.';
    }
  }
}

// Mostrar dívidas na tela
function mostrarDividas(dividas) {
  elementoLista.innerHTML = '';

  if (dividas.length === 0) {
    mensagem.textContent = 'Nenhuma dívida encontrada.';
    return;
  }

  mensagem.textContent = '';

  dividas.forEach(divida => {
    const dividaItem = document.createElement('div');
    dividaItem.classList.add('itemDivida');

    // Informações principais
    const resumo = document.createElement('p');

    resumo.textContent =
      `Nome: ${divida.nome} | ` +
      `CPF: ${divida.cpf} | ` +
      `Valor: R$ ${Number(divida.valor).toFixed(2)} | ` +
      `Situação: ${divida.situacao}`;

    dividaItem.appendChild(resumo);

    // Informações completas
    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhesDivida');
    detalhes.style.display = 'none';

    const informacoes = [
      ['Nome', divida.nome],
      ['CPF', divida.cpf],
      ['Email', divida.email],
      ['Valor', `R$ ${Number(divida.valor).toFixed(2)}`],
      ['Descrição', divida.descricao],
      ['Situação', divida.situacao],
      ['CEP', divida.cep],
      ['Número', divida.numero],
      ['Complemento', divida.complemento],
      ['Número do Processo', divida.processo],
      ['Comprovante', divida.comprovante]
    ];

    informacoes.forEach(([campo, valor]) => {
      if (valor !== undefined && valor !== null && String(valor).trim() !== '') {
        const linha = document.createElement('p');

        if (campo === 'Comprovante') {
          const link = document.createElement('a');

          link.href = `http://localhost:3000/uploads/${valor}`;
          link.textContent = 'Visualizar comprovante PDF';
          link.target = '_blank';

          linha.appendChild(link);
        } else {
          linha.textContent = `${campo}: ${valor}`;
        }

        detalhes.appendChild(linha);
      }
    });

    // Botão ver mais
    const botaoDetalhes = document.createElement('button');
    botaoDetalhes.textContent = 'Ver mais';
    botaoDetalhes.classList.add('botaoDetalhes');

    botaoDetalhes.addEventListener('click', () => {
      if (detalhes.style.display === 'none') {
        detalhes.style.display = 'block';
        botaoDetalhes.textContent = 'Ver menos';
      } else {
        detalhes.style.display = 'none';
        botaoDetalhes.textContent = 'Ver mais';
      }
    });

    dividaItem.appendChild(botaoDetalhes);
    dividaItem.appendChild(detalhes);

    // Botão excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('botaoExcluir');

    botaoExcluir.addEventListener('click', async () => {
      const confirmar = confirm('Deseja realmente excluir a dívida?');

      if (!confirmar) return;

      try {
        const resposta = await fetch(`${DIVIDAS}/${divida.id}`, {
          method: 'DELETE'
        });

        if (!resposta.ok) {
          throw new Error('Não foi possível excluir a dívida');
        }

        mensagem.textContent = 'Dívida excluída com sucesso!';
        await carregarDividas();

      } catch (erro) {
        mensagem.textContent = erro.message;
        console.error(erro);
      }
    });

    dividaItem.appendChild(botaoExcluir);
    elementoLista.appendChild(dividaItem);
  });

}
carregarDividas();

//cadastra divida
const formulario = document.getElementById('formDivida');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const caixaErro = document.getElementById('mensagemErro');

  caixaErro.innerHTML = '';
  caixaErro.style.display = 'none';

  const camposObrigatorios = [
    { nome: 'nome', descricao: 'Nome' },
    { nome: 'email', descricao: 'Email' },
    { nome: 'descricao', descricao: 'Descrição' },
    { nome: 'valor', descricao: 'Valor' },
    { nome: 'situacao', descricao: 'Situação' },
  ];

  const camposVazios = camposObrigatorios.filter(campo => {
    return !formulario[campo.nome].value.trim();
  });

  const mensagensErro = [];

  if (camposVazios.length > 0) {
    mensagensErro.push('Preencha os campos obrigatórios:');

    camposVazios.forEach(campo => {
      mensagensErro.push('- ' + campo.descricao);
    });
  }

  const cpf = formulario.cpf.value.replace(/\D/g, '');

  if(cpf.length === 0){
    mensagensErro.push('Preencha o campo CPF.')
  }else if (cpf.length !== 11) {
    mensagensErro.push('O CPF deve conter 11 dígitos.');
  }
  

  const cep = formulario.cep.value.replace(/\D/g, '');

  if (cep.length > 0 && cep.length !== 8) {
    mensagensErro.push('O CEP deve conter 8 dígitos.');
  }

  if (mensagensErro.length > 0) {
    caixaErro.style.display = 'block';
    caixaErro.innerHTML = '';

    mensagensErro.forEach(mensagem => {
      const paragrafo = document.createElement('p');
      paragrafo.textContent = mensagem;
      caixaErro.appendChild(paragrafo);
    });

    return;
  }

  caixaErro.style.display = 'none';

  try {
    const dados = new FormData(formulario); //pega os dados do formulário
    console.log('dados enviados:');
    for (const [campo, valor] of dados.entries()) {
      console.log(campo, valor);
    }
    const resposta = await fetch(DIVIDAS, {  //envia os dados para o servidor
      method: 'POST',
      body: dados
    });

    const resultado = await resposta.json();
    //verifica se ocorreu algum erro
    if (!resposta.ok) {
      throw new Error(
        resultado.detalhes ? resultado.detalhes.join(' ') : 'Erro ao cadastrar dívida'
      );
    }

    mensagem.textContent = 'Dívida cadastrada com sucesso!';
    formulario.reset(); //limpa o formulário
    await carregarDividas(); //atualiza a lista de dívidas

  } catch (erro) {
    mensagem.textContent = erro.message;
    console.error(erro);
  }
});
