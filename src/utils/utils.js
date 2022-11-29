const fs = require("fs");

const loadFile = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
};

const updateProduct = (filename, data) => {
  const products = fs.writeFileSync(filename, data);
  return JSON.parse(products);
};

module.exports = { loadFile, updateProduct };
