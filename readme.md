# Descrição

- Aplicação em node.js usando express, handlebars, passport, e mongo(mongoose) como banco

# Como subir Aplicação?

## Requisitos:

- ter node instalado:
1. caso não tenha baixe em: [site oficial node](https://nodejs.org/dist/v14.15.0/node-v14.15.0-x64.msi)

- ter o mongodb instalado:
1. caso não tenha baixe em: [site oficial mongo](https://www.mongodb.com/try/download/community?tck=docs_server)

- Execute o comando:
``` npm install ```

- Entre no diretorio da aplicação no cmd e digite
``` nodemon app.js ```

1. caso não funcione execute os comandos:

1. npm install express --save
2. npm install --save express-handlebars
3. npm install body-parser --save
4. npm install --save mongoose
5. npm install --save bcryptjs //criptografar senha
6. npm install --save passport //formas para autenticação
7. npm install --save passport-local //forma de autenticar, no caso é local(banco do app)

- Entre no diretorio da aplicação no cmd e digite
1. ``` npm install ```
2. ``` nodemon app.js ```

- acesse a url no navegador:
[http://localhost:8081/](http://localhost:8081/)