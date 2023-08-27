require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const validator = require("validator");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);
app.use("/style", express.static(path.join(__dirname, "style")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  "/scripts",
  express.static(path.join(__dirname, "scripts"), { type: "text/javascript" })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  const formSubmitted = req.session.formSubmitted || false;
  req.session.formSubmitted = false;
  res.render("index.ejs", { formSubmitted: formSubmitted });
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

app.post("/submit", (req, res) => {
  const nome = req.body.nameUser;
  const email = req.body.emailUser;
  const telefone = req.body.telUser;

  if (!validator.isLength(nome, { min: 2 })) {
    res.status(400).send("O nome deve conter pelo menos 5 caracteres.");
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send("O e-mail não é válido.");
    return;
  }

  const novoLead = {
    Nome_Completo: nome,
    email: email,
    telefone: telefone,
  };

  connection.query("INSERT INTO leads SET ?", novoLead, (err, results) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
      res.status(500).send("Erro ao inserir dados no banco.");
    } else {
      console.log(
        "Dados inseridos com sucesso. ID do novo lead:",
        results.insertId
      );
      req.session.formSubmitted = true;
      res.redirect("/");
    }
  });
});

app.listen(8000, () => {
  console.log("Servidor iniciado na porta 8000");
});
