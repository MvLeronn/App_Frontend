# AppPromoPage

1. **Frontend**: React JS com Vite
2. **Backend**: Node.js com Express e MongoDB
3. **PromoPage**: Página estática da promoção da série (HTML/CSS/JS) - [PromoPage - Repositório](https://github.com/MvLeronn/PromoPage)

## Descrição

- **Backend**: É responsável pelo registro e login de usuários, além de gerenciar as perguntas, permitindo que sejam recebidas, buscadas e respondidas.
- **Frontend**: Oferece uma interface onde o usuário pode realizar o login e visualizar uma página com as perguntas, organizadas em duas abas: "Perguntas para Responder" e "Perguntas Respondidas". Na aba "Perguntas para Responder", o usuário pode responder às perguntas pendentes, enquanto na aba "Perguntas Respondidas", ele pode visualizar suas respostas anteriores.

## Funcionalidades:

### [PromoPage (HTML/CSS/JS)](https://github.com/MvLeronn/PromoPage)

- Formulário público para envio de perguntas
- Integração com o backend via API

### [Backend (Node.js/Express + MongoDB)](https://github.com/MvLeronn/AppPromoPage/tree/main/backend)

#### **Autenticação**

- Login com JWT (JSON Web Token)
- Middleware de proteção de rotas

#### **Endpoints**

- Endpoint para registrar usuário
- Endpoint para logar usuário
- Endpoint para receber a pergunta de PromoPage
- Endpoint para buscar todas as perguntas
- Endpoint para responder a pergunta

### [Frontend (React JS Vite)](https://github.com/MvLeronn/AppPromoPage/tree/main/frontend)

#### **Login**

- Sistema de login com token

#### **Perguntas**

- Aba "Novas Perguntas": visualização e resposta
- Aba "Respondidas": consulta histórica das respostas

## Pré-requisitos

Antes de começar, você precisa ter os seguintes softwares instalados:

- Git
- Node.js e npm (Node Package Manager)
- MongoDB e MongoDB Compass (Mongo DB tem que estar no localhost:27017)

## Executando o projeto

1. Clone os repositórios

- git clone https://github.com/MvLeronn/PromoPage.git
- git clone https://github.com/MvLeronn/AppPromoPage.git

2. **PromoPage (HTML, CSS e JS puro)**

    1. Abre o index.html no seu navegador
    2. Abra o arquivo index.html diretamente no seu navegador (não é necessário servidor, pois é uma página estática).

3. **Backend (Node.js + Express + MongoDB)**

    1. Navegue até a pasta do Backend dentro de APPPROMOPAGE
    2. npm install
    3. npm start

    Com o npm start vai rodar o backend e criar o banco de dados no MongoDB na porta localhost:27017, nosso banco de dados terá o nome de apppromopage.

    **Obs**: No Backend está setado para que apenas as origens ["http://localhost:5173", "http://127.0.0.1:5500"] consigam acessar o servidor. Sendo a primeira o frontend e a segunda origem o index.html da página propaganda. Então fique esperto se precisar mudar, está na linha 16 em index.js do backend.

4. **Frontend (React com Vite)**
    1. npm install
    2. npm run dev
    3. [Acesse o frontend no navegador](http://localhost:5173/)
    4. Logar:
        - email: admin@gmail.com
        - senha: admin