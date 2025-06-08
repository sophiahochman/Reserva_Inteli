const express = require("express");
const app = express();
const PORT = 3000;

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware para arquivos estáticos
app.use(express.static(__dirname + "/views"));

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas das páginas do protótipo
app.get("/", (req, res) => {
  res.render("pages/loginPage");
});

app.get("/loginPage", (req, res) => {
  res.render("pages/loginPage");
});

app.get("/reservaPage", (req, res) => {
  res.render("pages/reservaPage");
});

app.get("/selectPage", (req, res) => {
  res.render("pages/selectPage");
});

app.get("/timePage", (req, res) => {
  res.render("pages/timePage");
});

app.get("/minhasReservas", (req, res) => {
  res.render("pages/minhasReservas");
});

// Rotas de API (com prefixo para não conflitar)
const routes = require("./routes/index");
app.use("/api", routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
