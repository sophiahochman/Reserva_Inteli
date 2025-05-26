# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto
ReservaInteli

#### Autor do projeto
Sophia Hochman

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O sistema que será desenvolvido é uma plataforma web de reserva de salas para estudantes do Inteli, com foco na praticidade e na autonomia do usuário. Atualmente, o processo de reserva de salas no Inteli é realizado presencialmente, diretamente na recepção. Esse método, além de consumir tempo, está sujeito a erros humanos e falhas de comunicação, o que frequentemente gera frustrações para alunos e funcionários.

Pensando nisso, o sistema proposto permitirá que os estudantes visualizem a disponibilidade das salas e façam reservas online de forma rápida e prática, seja pelo celular ou computador. A plataforma também enviará confirmações por e-mail e permitirá o cancelamento ou reagendamento das reservas com facilidade.

O objetivo é tornar o processo mais eficiente, transparente e acessível, reduzindo a carga de trabalho da equipe da recepção e melhorando a experiência dos alunos no uso dos espaços compartilhados da faculdade. A interface será simples, intuitiva e otimizada para dispositivos móveis, considerando os hábitos digitais dos estudantes do Inteli.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

<div align="center">
<img width="451" alt="Image" src="https://github.com/user-attachments/assets/4e4013e4-1c0d-4a26-88cc-ac5e750b04f4" />
 </div>



### 2.2. User Stories (Semana 01)


\# | User Stories 
--- | ---
US01 | Como estudante do Inteli, quero visualizar a disponibilidade das salas, para que eu possa escolher um horário livre com facilidade.
US02 | Como estudante do Inteli, quero reservar uma sala diretamente pelo sistema, para não precisar ir até a recepção.
US03 | Como estudante do Inteli, quero poder cancelar ou alterar uma reserva feita, para que eu não ocupe a sala caso meus planos mudem.
US04 | Como estudante do Inteli, quero poder favoritar salas que eu uso com frequência, para agilizar minhas próximas reservas.


US02 | Como estudante da Inteli, quero reservar uma sala diretamente pelo sistema, para tornar o processo mais rápido e autônomo.(Prioritária)

I – Independente: Funciona sozinha, desde que as salas estejam cadastradas no sistema.

N – Negociável: A forma de reserva pode ser adaptada (com ou sem login, com seleção por dia ou por grade semanal, etc).

V – Valiosa: Resolve o maior incômodo atual — a dependência da recepção para fazer reservas.

E – Estimável: A equipe consegue estimar o esforço com base em sistemas similares e frameworks usados.

S – Small: Pode ser desenvolvida como uma funcionalidade bem focada (preencher e enviar reserva).

T – Testável: Pode ser testada simulando uma reserva e verificando a resposta do sistema.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)
```

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  status VARCHAR NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  status VARCHAR NOT NULL
);

```

<div align="center">
  <img src="../assets/bancoDados.png" width="100%"
  alt="Imagem do banco de dados"><br>
</div>


### 3.1.1 BD e Models (Semana 5)
Os Models do sistema foram desenvolvidos seguindo a arquitetura MVC (Model-View-Controller), e estão localizados na pasta models/ do projeto. Esses modelos representam as entidades principais do sistema de reserva de salas da instituição e são responsáveis pela comunicação com o banco de dados, estruturado em PostgreSQL.
Cada model define a estrutura das tabelas do banco de dados, incluindo os campos, tipos de dados e relacionamentos entre entidades. A seguir, uma breve descrição dos principais modelos implementados:

Usuário (User): representa os usuários do sistema, contendo informações como nome, e-mail, matrícula e tipo de perfil (ex: aluno, professor, administrador).

Sala (Room): define os dados das salas disponíveis para reserva, incluindo nome da sala, localização e capacidade.

Reserva (Booking): registra as reservas feitas pelos usuários, contendo dados como data, horário, sala reservada e usuário responsável.

Esses modelos permitem realizar operações como criação, leitura, atualização e exclusão (CRUD) diretamente no banco de dados, garantindo a integridade das informações e o bom funcionamento da aplicação. A estrutura modular também facilita futuras expansões e manutenções no sistema.



### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

<div align="center">
  <img src="../assets/WireFrame.png" width="100%"
  alt="wire frame"><br>
</div>

https://www.figma.com/design/yMx8z6V90azeO57Mc6PmDy/Untitled?node-id=0-1&t=TvFh0XZwV5sfasTy-1 

### 3.4. Guia de estilos (Semana 05)

<div align="center">
  <img src="../assets/guiaEstilos.png" width="100%"
  alt="Imagem do banco de dados"><br>
</div>

https://www.figma.com/design/yMx8z6V90azeO57Mc6PmDy/Untitled?node-id=41-91&p=f&t=NXb8NO7se3D6uT0F-0


### 3.5. Protótipo de alta fidelidade (Semana 05)

<div align="center">
  <img src="../assets/altaFidelidade.png" width="100%"
  alt="Imagem do banco de dados"><br>
</div>

https://www.figma.com/design/yMx8z6V90azeO57Mc6PmDy/Untitled?node-id=1-2&p=f&t=NXb8NO7se3D6uT0F-0 

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

https://www.inteli.edu.br/

---
---
