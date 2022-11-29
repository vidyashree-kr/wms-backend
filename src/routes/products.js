/* eslint-disable radix */
/* eslint-disable no-param-reassign */
const express = require("express");
const { loadFile, updateProduct, loadProducts } = require("../utils/utils");

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/getProducts", async (req, res) => {
  let finalProducts;
  try {
    const inventories = loadFile("src/assets/inventory.json");
    const products = loadFile("src/assets/products.json");
    finalProducts = await loadProducts(products, inventories);
    console.log(`Products ${JSON.stringify(finalProducts)}`);
    res.send(`${JSON.stringify(finalProducts)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
  return finalProducts;
});

router.post("/addProduct", async (req, res) => {
  let finalProducts;
  try {
    const inventories = loadFile("src/assets/inventory.json");
    const products = loadFile("src/assets/products.json");
    finalProducts = await loadProducts(products, inventories);
    const newProduct = {
      name: req.body.name,
      contain_articles: req.body.contain_articles,
    };
    const matchedProduct = finalProducts.products.find(
      (el) => el.name.toLowerCase() === req.body.name.toLowerCase()
    );
    let finalProduct;
    if (matchedProduct) {
      finalProducts.products.forEach((val) => {
        if (val === matchedProduct) {
          val.contain_articles.forEach((art) => {
            newProduct.contain_articles.forEach((pr) => {
              if (art.art_id.match(pr.art_id)) {
                const stock = parseInt(art.stock);
                art.stock = (stock + 1).toString();
              }
            });
          });
        }
      });
      finalProduct = finalProducts;
    } else {
      finalProduct = { products: finalProducts.products.concat(newProduct) };
    }
    console.log(`products:=======> ${JSON.stringify(finalProduct)}`);
    res.send(`${JSON.stringify(finalProduct)}`);
    updateProduct("src/assets/products.json", JSON.stringify(finalProduct));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
