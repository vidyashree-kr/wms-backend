/* eslint-disable no-param-reassign */
const express = require("express");
const { loadFile } = require("../utils/utils");

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/getProducts", (req, res) => {
  let finalProducts;
  try {
    const inventories = loadFile("src/assets/inventory.json");
    const products = loadFile("src/assets/products.json");
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
    // updateProduct("src/assets/appProducts.json", JSON.stringify(a));
    console.log(`Products ${JSON.stringify(finalProducts)}`);
    res.send(`${JSON.stringify(finalProducts)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
  return finalProducts;
});

router.post("/addProduct", async (req, res) => {
  try {
    const products = loadFile("src/assets/products.json");
    const newProduct = {
      name: req.body.name,
      contain_articles: [
        {
          art_id: req.body.art_id,
          amount_of: req.body.amount_of,
        },
        {
          art_id: req.body.art_id,
          amount_of: req.body.amount_of,
        },
        {
          art_id: req.body.art_id,
          amount_of: req.body.amount_of,
        },
      ],
    };
    let finalProduct = [];
    finalProduct = products.products.push(newProduct);
    console.log(`Inventories: ${JSON.stringify(finalProduct)}`);
    res.send(`${JSON.stringify(newProduct)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
});

module.exports = router;
