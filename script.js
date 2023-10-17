const fs = require('fs');
const htmlMinifier = require('html-minifier');

const inputHTML = fs.readFileSync('index-min.html', 'utf8');

const minifyOptions = {
  collapseWhitespace: true, 
  removeComments: true,      
  minifyJS: true,      
  minifyCSS: true,          
};

const minifiedHTML = htmlMinifier.minify(inputHTML, minifyOptions);

fs.writeFileSync('index.html', minifiedHTML);