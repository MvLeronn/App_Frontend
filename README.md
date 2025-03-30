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
