# Documentação do Sistema de Reservas

## Visão Geral

Este documento descreve as views e mudanças relevantes no backend e banco de dados do Sistema de Reservas.

## Views do Sistema

### 1. Página de Login (loginPage.ejs)

- Interface de autenticação
- Formulário de login com email e senha
- Validação de campos
- Feedback visual de erros

### 2. Página Principal (homePage.ejs)

- Dashboard com visão geral das reservas
- Navegação para outras seções
- Lista de salas disponíveis

### 3. Nova Reserva (novaReserva.ejs)

- Formulário para criar nova reserva
- Seleção de sala
- Seleção de data e horário
- Validação de disponibilidade

### 4. Minhas Reservas (minhasReservas.ejs)

- Lista de reservas do usuário
- Opções para editar/cancelar reservas
- Status das reservas

### 5. Seleção de Sala (selectPage.ejs)

- Lista de salas disponíveis
- Filtros de busca
- Visualização de detalhes da sala

### 6. Seleção de Horário (timePage.ejs)

- Calendário interativo
- Seleção de horários disponíveis
- Visualização de reservas existentes

## Mudanças no Backend

### Rotas Implementadas

1. Autenticação

   - POST /auth/login
   - POST /auth/register
   - GET /auth/logout

2. Reservas

   - GET /bookings
   - POST /bookings
   - PUT /bookings/:id
   - DELETE /bookings/:id

3. Salas

   - GET /rooms
   - GET /rooms/:id
   - GET /rooms/available

4. Usuários
   - GET /users/profile
   - PUT /users/profile

### Controllers

- AuthController: Gerenciamento de autenticação
- BookingController: Lógica de reservas
- RoomController: Gerenciamento de salas
- UserController: Operações de usuário

## Banco de Dados

### Tabelas

1. users

   - id (SERIAL PRIMARY KEY)
   - name (VARCHAR)
   - email (VARCHAR UNIQUE)
   - password (VARCHAR)

2. rooms

   - id (SERIAL PRIMARY KEY)
   - name (VARCHAR)
   - status (VARCHAR)

3. bookings
   - id (SERIAL PRIMARY KEY)
   - user_id (INTEGER REFERENCES users)
   - room_id (INTEGER REFERENCES rooms)
   - date (DATE)
   - start_time (TIME)
   - status (VARCHAR)

## Integração Frontend-Backend

### Fetch API Implementada

- Autenticação de usuários
- CRUD de reservas
- Consulta de salas disponíveis
- Gerenciamento de perfil

### Validações

- Formulários com validação client-side
- Feedback visual de erros
- Loading states durante requisições

## Estilização

- CSS organizado por componentes
- Layout responsivo
- Feedback visual para interações
- Cores e espaçamentos consistentes
