/* eslint-disable radix */
/* eslint-disable no-param-reassign */
const express = require("express");
const { loadFile, updateData, loadProducts } = require("../utils/utils");

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
      finalProducts.products.forEach((productElement) => {
        if (productElement === matchedProduct) {
          productElement.contain_articles.forEach((art) => {
            newProduct.contain_articles.forEach((pr) => {
              if (art.art_id.match(pr.art_id)) {
                const stock = parseInt(art.stock);
                const amountOf = parseInt(pr.amount_of);
                art.stock = (stock + amountOf).toString();
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
    updateData("src/assets/products.json", JSON.stringify(finalProduct));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

router.delete("/sellProduct", async (req, res) => {
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
    const matchedProductIndex = finalProducts.products.indexOf(matchedProduct);
    let finalProduct;
    let finalInventory;
    const invIds = [];
    const finalInv = [];
    if (matchedProduct) {
      finalProducts.products.forEach((productElement) => {
        if (productElement === matchedProduct) {
          productElement.contain_articles.forEach((articalElement) => {
            const matchedInventory = inventories.inventory.find(
              (v) => v.art_id === articalElement.art_id
            );
            const matchedInventoryIndex =
              inventories.inventory.indexOf(matchedInventory);
            newProduct.contain_articles.forEach((pr) => {
              if (articalElement.art_id.match(pr.art_id)) {
                const stock = parseInt(articalElement.stock);
                const amountOf = parseInt(pr.amount_of);

                if (parseInt(pr.stock) < amountOf) {
                  // delete inventory
                  finalInventory = {
                    inventory: inventories.inventory.splice(
                      matchedInventoryIndex,
                      1
                    ),
                  };
                } else if (stock > amountOf) {
                  console.log(`stock > amountof -`, articalElement.stock);
                  // reduce the inventory stock
                  articalElement.stock = (stock - amountOf).toString();

                  const inv = {
                    name: matchedInventory.name,
                    art_id: articalElement.art_id,
                    stock: articalElement.stock,
                  };
                  finalInv.push(inv);
                  invIds.push(inv.art_id);
                }
              }
            });
          });
          // delete product
          finalProducts.products.splice(matchedProductIndex, 1);

          // Update inventories list
          const remainingInventory = inventories.inventory.filter(
            (element) => !invIds.includes(element.art_id)
          );
          finalInventory = { inventory: finalInv.concat(remainingInventory) };
        }
      });
      finalProduct = finalProducts;
    } else {
      console.log(`Product doesn't exists`);
      res.send(`Product doesn't exists`);
    }
    console.log(`inventory:=======> ${JSON.stringify(finalInventory)}`);
    console.log(`products:=======> ${JSON.stringify(finalProduct)}`);
    res.send(`${JSON.stringify(finalProduct)}`);
    updateData("src/assets/products.json", JSON.stringify(finalProduct));
    updateData("src/assets/inventory.json", JSON.stringify(finalInventory));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
