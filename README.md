# Comente-Sobre
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/MarceloDevCruz/comente-sobre/blob/master/LICENCE) 

# Sobre o projeto

Projeto que fiz utilizando a arquitetura de software MVC Model View Controller, Comente-sobre é um CRUD que tem autenticação de usuários no sistema onde usei o banco de dados MySQL para persistir os dados de login e de comentários de post dos projeto, as funcionalidades desse projeto consiste em, escrever um posto qualquer com um título e uma descrição, ou seja o comentário que você deseja fazer para o seu post e com isso você pode compartilhar para outros usuários que tenham uma conta o seu post, você também tem a opção de editar, e excluir seus post, na página home você pode encontrar todos os post de todos os outros usúarios, também foi realizado features de ordenação dos post, dos mais antigos até os mais recentes, e ainda uma feature de busca onde o ORM vai filtrar tanto buscas com o título quanto buscas dentro do comentário do usuário. Na persistencia de dados foi usado o pacote do bcrypts para criptografar a senha passada para o banco de dados para requisistos de segurança.
### Registro
![Registro](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/registro.png)

### Login
![Login](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/login.png)

### Página Home
![Página Home](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/home_1.png)

### Filtros e Busca
![Filtros e Busca](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/home_2.png)

### Edit de posts
![Edit de posts](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/edit.png)

### Banco de Dados
![Banco de Dados](https://github.com/MarceloDevCruz/comente-sobre/blob/master/public/img/database.jpg)

# Tecnologias utilizadas
 - HTML
 - CSS
 - JS
 - Bootstrap
 - Node.Js
 - MySQL
 
 ## Depêndencias utilizadas
 - bcrypts
 - express
 - mysql2
 - nodemon
 - sequelize

# Como executar o projeto

## Pré-requisitos
npm / yarn

```bash
# clonar repositório
git clone https://github.com/MarceloDevCruz/comente-sobre

# entrar na pasta do projeto
cd comente-sobre

# instalar dependências
npm install

# executar o projeto
npm start
```

# Autor
Marcelo Ferreira Cruz

##LinkedIn
https://www.linkedin.com/in/marcelo-ferreira-cruz/


