const fs = require("fs");
const { minify } = require("uglify-js");

try {
  const jsContent = fs.readFileSync("script.js", "utf-8");

  const minifiedJs = minify(jsContent).code;

  fs.writeFileSync("script.min.js", minifiedJs, "utf-8");
} catch (error) {
  console.error(error);
}
