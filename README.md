# ReservaInteli — Sistema de Reserva de Salas

ReservaInteli é uma aplicação web completa para gerenciamento de reservas de salas, desenvolvida com foco em praticidade, responsividade e autonomia dos usuários. O sistema foi criado utilizando Node.js, Express, PostgreSQL e EJS, com arquitetura MVC.

---

## Funcionalidades Principais

- Autenticação de usuários com criptografia de senha
- Visualização de salas disponíveis em tempo real
- Criação, edição e cancelamento de reservas
- Interface web responsiva (mobile-first)
- Feedback visual para ações do usuário
- Validação em tempo real de formulários com JavaScript

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- Bcrypt (hash de senhas)

### Frontend
- EJS (Embedded JavaScript templates)
- CSS3 (com Flexbox e Grid Layout)
- JavaScript moderno (ES6+)
- Fetch API para chamadas HTTP assíncronas

---

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

---

## Instalação e Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/sophiahochman/Reserva_Inteli.git
cd Reserva_Inteli

# 2. Instale as dependências
npm install

# 3. Crie o banco de dados no PostgreSQL
# Exemplo: CREATE DATABASE reserva_inteli;

# 4. Execute o script de criação de tabelas (opcional)
node scripts/createDatabase.js

# 5. Configure as variáveis de ambiente
```

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=reserva_inteli
SESSION_SECRET=sua_chave_secreta
```

```bash
# 6. Inicie o servidor
npm start
```

Acesse em: http://localhost:3000

---

## Estrutura do Projeto

```
reserva-inteli/
├── config/           # Configuração do banco de dados
├── controllers/      # Lógica de controle (Controllers)
├── models/           # Modelos de dados (ORM)
├── public/           # Arquivos estáticos (CSS, imagens)
├── routes/           # Definição de rotas
├── scripts/          # Scripts utilitários
├── views/            # Templates EJS
│   ├── pages/        # Páginas principais
│   ├── layout/       # Layouts base
│   └── components/   # Componentes reutilizáveis
├── .env              # Variáveis de ambiente (não subir ao Git)
├── package.json      # Scripts e dependências
└── server.js         # Arquivo principal do servidor
```

---

## Rotas da API

### Autenticação

| Método | Rota                   | Descrição                |
|--------|------------------------|--------------------------|
| POST   | /api/auth/login        | Login de usuário         |
| POST   | /api/auth/register     | Cadastro de usuário      |
| GET    | /api/auth/logout       | Logout                   |

### Reservas

| Método | Rota                   | Descrição                |
|--------|------------------------|--------------------------|
| GET    | /api/bookings          | Listar reservas          |
| POST   | /api/bookings          | Criar nova reserva       |
| PUT    | /api/bookings/:id      | Atualizar reserva        |
| DELETE | /api/bookings/:id      | Cancelar reserva         |

### Salas

| Método | Rota                        | Descrição                    |
|--------|-----------------------------|------------------------------|
| GET    | /api/rooms                  | Listar todas as salas        |
| GET    | /api/rooms/:id              | Detalhes de uma sala         |
| GET    | /api/rooms/available        | Listar salas disponíveis     |

---

## Páginas do Sistema

### Login (/login)

- Autenticação de usuários
- Validação de campos e mensagens de erro

### Home (/home)

- Dashboard com lista de salas disponíveis
- Acesso rápido às funcionalidades

### Nova Reserva (/nova-reserva)

- Formulário de reserva com seleção de data e horário
- Validação de disponibilidade

### Minhas Reservas (/minhas-reservas)

- Histórico do usuário
- Opções para vizualizar


## Como Contribuir

1. Faça um fork do repositório  
2. Crie uma branch com sua feature:  
   `git checkout -b feature/nome-da-feature`  
3. Faça o commit das alterações:  
   `git commit -m 'Adiciona nova feature'`  
4. Faça o push da branch:  
   `git push origin feature/nome-da-feature`  
5. Abra um Pull Request

---

## Status do Projeto

- Concluído  
- Testado localmente  
- Aguardando sugestões de melhorias
