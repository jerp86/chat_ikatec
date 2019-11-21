# chat_ikatec

## Chat utilizando as tecnologias Nodejs e React.

### Requisitos funcionais

- O usuário deve informar um nome ao ingressar no chat (não necessário ser único);
- Ao enviar uma mensagem, todos os integrantes devem recebe-lá juntamente com o nome de quem enviou;
- Ao ingressar no chat as últimas 30 mensagens devem ser exibidas.

### Requisitos não funcionais

- Deve ser composta de duas partes. Uma API em Nodejs, Express e Sequelize e um frontend em React;
- O banco de dados para armazenamento das mensagens deve ser Postgres;
- Utilizar Sequelize como ORM para comunicação com o banco de dados;
- O envio de mensagens do front para a API deve ser dado por HTTP;
- O carregamento das primeiras 30 mensagens do chat deve ser dado por HTTP;
- O recebimento das mensagens da API para o front deve ser dada por web socket;
- Deve ser utilizado Bootstrap juntamente com a biblioteca Reactstrap para montagem da interface;
- O estilo do código deve seguir, o mais próximo possivel, o Airbnb JavaScript Style Guide (https://github.com/airbnb/javascript);
