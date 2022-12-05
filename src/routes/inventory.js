/* eslint-disable radix */
const express = require("express");
const { loadFile, updateData } = require("../utils/utils");

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/getInventory", async (req, res) => {
  try {
    const inventories = loadFile("src/assets/inventory.json");
    console.log(`Inventories: ${JSON.stringify(inventories)}`);
    res.send(`${JSON.stringify(inventories.inventory)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
});

router.post("/addInventory", async (req, res) => {
  let finalInventory;
  try {
    const inventories = loadFile("src/assets/inventory.json");
    inventories.inventory.forEach((el) => {
      if (req.body.art_id.match(el.art_id)) {
        const newStock = parseInt(req.body.stock);
        const existingStock = parseInt(el.stock);
        const inv = {
          name: req.body.name,
          art_id: el.art_id,
          stock: (newStock + existingStock).toString(),
        };
        finalInventory = {
          inventory: inventories.inventory.concat(inv),
        };
      } else {
        const newInventory = {
          name: req.body.name,
          art_id: req.body.art_id,
          stock: req.body.stock,
        };
        finalInventory = {
          inventory: inventories.inventory.concat(newInventory),
        };
      }
    });

    console.log(`Inventories: ${JSON.stringify(finalInventory)}`);
    res.send(`${JSON.stringify(finalInventory)}`);
    updateData("src/assets/inventory.json", JSON.stringify(finalInventory));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
