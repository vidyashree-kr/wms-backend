/* eslint-disable no-param-reassign */
const fs = require("fs");

const loadFile = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
};

const updateProduct = (filename, data) => {
  fs.writeFileSync(filename, data);
};

const loadProducts = async (products, inventories) => {
  let finalProducts;
  try {
    const appProducts = [];
    products.products.forEach((product) => {
      const article = product.contain_articles;
      const { inventory } = inventories;
      article.forEach((art) => {
        inventory.forEach((inv) => {
          if (art.art_id.match(inv.art_id)) {
            art.name = inv.name;
            art.stock = inv.stock;
          }
        });
      });
    });
    appProducts.push(products);
    finalProducts = Object.assign({}, appProducts[0]);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return finalProducts;
};

module.exports = { loadFile, updateProduct, loadProducts };
