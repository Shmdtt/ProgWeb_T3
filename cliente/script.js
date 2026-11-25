
const DIVIDAS = 'http://localhost:3000/dividas';

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

    mostrarDividas(dividas);

  } catch (erro) {
    console.log(erro);
    elementoLista.textContent = 'Erro ao carregar dívidas.';
    mensagem.textContent = 'Erro ao carregar dívidas.';
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

    dividaItem.textContent =
      `Nome: ${divida.nome} | ` +
      `CPF: ${divida.cpf} | ` +
      `Valor: R$ ${Number(divida.valor).toFixed(2)} | ` +
      `Situação: ${divida.situacao}`;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('botaoExcluir');

    botaoExcluir.addEventListener('click', async () => {

      const confirmar = confirm(`Deseja realmente excluir a dívida?`);
      if (!confirmar) {
        return;
      }

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
    { nome: 'cpf', descricao: 'CPF' },
    { nome: 'email', descricao: 'Email' },
    { nome: 'descricao', descricao: 'Descrição' },
    { nome: 'valor', descricao: 'Valor' },
    { nome: 'situacao', descricao: 'Situação' }
  ]

  const camposVazios = camposObrigatorios.filter(campo => {
    return !formulario[campo.nome].value.trim();
  });

  if (camposVazios.length > 0) {
    caixaErro.style.display = 'block';
    caixaErro.innerHTML = '<stong>Preencha os campos obrigatórios:</strong>';

    camposVazios.forEach(campo => {
      const paragrafo = document.createElement('p');
      paragrafo.textContent = '- ' + campo.descricao;
      caixaErro.appendChild(paragrafo);
    });
    return;
  }

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
