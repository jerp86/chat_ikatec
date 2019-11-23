<h1 align="center">
  Chat Ikatec
</h1>

<h3 align="center">
  Chat utilizando as tecnologias Nodejs e React
<h3>

<p align="center">
  <a href="#memo-requisitos-funcionais">Requisitos funcionais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-requisitos-não-funcionais">Requisitos não funcionais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalacao-e-execucao">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>
</p>

## :memo: Requisitos funcionais

- O usuário deve informar um nome ao ingressar no chat (não necessário ser único);
- Ao enviar uma mensagem, todos os integrantes devem recebe-lá juntamente com o nome de quem enviou;
- Ao ingressar no chat as últimas 30 mensagens devem ser exibidas.

## :memo: Requisitos não funcionais

- Deve ser composta de duas partes. Uma API em Nodejs, Express e Sequelize e um frontend em React;
- O banco de dados para armazenamento das mensagens deve ser Postgres;
- Utilizar Sequelize como ORM para comunicação com o banco de dados;
- O envio de mensagens do front para a API deve ser dado por HTTP;
- O carregamento das primeiras 30 mensagens do chat deve ser dado por HTTP;
- O recebimento das mensagens da API para o front deve ser dada por web socket;
- Deve ser utilizado Bootstrap juntamente com a biblioteca Reactstrap para montagem da interface;
- O estilo do código deve seguir, o mais próximo possivel, o Airbnb JavaScript Style Guide (https://github.com/airbnb/javascript);

## <a name="instalacao-e-execucao"></a>🚀 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd chat`;
3. Execute as instruções do README do [Back](./back/README.md) e do [Front](./front/README.md).

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

---

Feito com ♥ by Jerp
