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

## 📚 Considerações Finais

O projeto aplica conceitos de desenvolvimento web, comunicação HTTP, validação de dados e persistência de informações, atendendo aos requisitos propostos no Trabalho M3 da disciplina de Programação II.