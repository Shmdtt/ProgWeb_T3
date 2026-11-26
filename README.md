# Programação Web - Trabalho 3 (ProgWeb_T3)

## 📌 Sobre o Projeto

Sistema web desenvolvido para realizar o cadastro, a listagem, a visualização e a exclusão de dívidas de clientes de uma empresa, utilizando comunicação entre cliente e servidor.

## 🚀 Funcionalidades

- Cadastro de dívidas com informações do cliente.
- Listagem e visualização detalhada dos registros.
- Exclusão de dívidas cadastradas.
- Validação dos campos obrigatórios no cliente e servidor.
- Cadastro opcional de endereço, processo judicial e comprovante PDF.
- Armazenamento dos registros no servidor em arquivo JSON.
- Utilização do `localStorage` para consulta dos dados quando o servidor estiver indisponível.

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- Multer
- JSON
- localStorage

## 📁 Estrutura do Projeto

```text
ProgWeb_T3/
├── cliente/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── servidor/
│   ├── data/
│   │   └── dados.json
│   ├── src/
│   │   ├── routes/
│   │   │   └── dividas.js
│   │   ├── armazenamento.js
│   │   └── validacao.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
└── README.md
```

## 🔄 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dividas` | Lista as dívidas cadastradas. |
| POST | `/dividas` | Cadastra uma nova dívida. |
| DELETE | `/dividas/:id` | Exclui uma dívida. |
| GET | `/uploads/:arquivo` | Disponibiliza os comprovantes PDF. |

## ⚙️ Como Executar

**1.** Acesse a pasta do servidor:

```bash
cd servidor
```

**2.** Instale as dependências:

```bash
npm install
```

**3.** Inicie o servidor:

```bash
npm start
```

**4.** Abra o arquivo `cliente/index.html` no navegador.

O servidor será executado em:

`http://localhost:3000`

🧪 Cenários de Teste Sugeridos

Cadastro de Dívidas:

Preencha todos os campos obrigatórios e clique em Cadastrar Dívida.

Verifique se a dívida aparece corretamente na listagem.

Realize outro cadastro preenchendo também os campos opcionais.

Validação dos Campos:

Tente cadastrar uma dívida com os campos obrigatórios vazios.

Informe um CPF com menos de 11 dígitos e verifique a mensagem de erro.

Informe um e-mail inválido.

Preencha o CEP com menos de 8 dígitos e verifique a validação.

Verifique se o servidor também rejeita informações inválidas.

Visualização de Dívidas:

Clique em Ver mais para visualizar todas as informações de uma dívida.

Clique em Ver menos para recolher os detalhes.

Verifique se os campos opcionais aparecem somente quando preenchidos.

Comprovante em PDF:

Cadastre uma dívida anexando um arquivo PDF.

Acesse os detalhes da dívida e clique em Visualizar comprovante PDF.

Verifique se o documento é aberto corretamente.

Exclusão de Dívidas:

Clique no botão Excluir de uma dívida cadastrada.

Confirme a exclusão.

Verifique se o registro desaparece da listagem e do armazenamento local.

Armazenamento Local:

Realize cadastros com o servidor ligado.

Verifique se os registros estão armazenados na chave dividas do localStorage.

Atualize a página e confira se os registros continuam disponíveis.

Funcionamento Offline:

Com os registros já armazenados localmente, desligue o servidor.

Atualize a página no navegador.

Verifique se as dívidas continuam aparecendo utilizando os dados salvos no localStorage.