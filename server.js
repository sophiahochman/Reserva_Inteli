require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const homeRoutes = require("./routes/home");

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});

// Configuração da sessão
app.use(
  session({
    secret: "sua-chave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);

// Rota de teste
app.get("/test", (req, res) => {
  res.json({ message: "Servidor está funcionando!" });
});

// Rotas das páginas do protótipo
app.get("/login", (req, res) => {
  res.render("pages/loginPage");
});

app.get("/selectPage", (req, res) => {
  res.render("pages/selectPage");
});

app.get("/timePage", (req, res) => {
  res.render("pages/timePage");
});

// Rotas de API
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const minhasReservasRoutes = require("./routes/minhasReservas");
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/minhas-reservas", minhasReservasRoutes);

// Substituir:
app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.redirect("/home");
});
app.use("/home", homeRoutes);

// Endpoint temporário para debug: retorna o user_id da sessão atual
app.get("=/api/session-user", (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
