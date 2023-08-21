const fs = require("fs");
const CleanCSS = require("clean-css");

// Leitura do arquivo CSS
const cssContent = fs.readFileSync("style.css", "utf-8");

// Instanciando o objeto CleanCSS
const minifiedCss = new CleanCSS().minify(cssContent).styles;

// Escrevendo o CSS minificado de volta para um arquivo
fs.writeFileSync("style.min.css", minifiedCss, "utf-8");
