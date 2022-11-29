const express = require("express");
const { loadFile } = require("../utils/utils");

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
    res.send(`All Inventories: ${JSON.stringify(inventories.inventory)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
});

router.post("/addInventory", async (req, res) => {
  try {
    const inventories = loadFile("src/assets/inventory.json");
    const newInventory = {
      name: req.body.name,
      art_id: req.body.art_id,
      stock: req.body.stock,
    };
    let finalInventory = [];
    finalInventory = inventories.inventory.push(newInventory);
    console.log(`Inventories: ${JSON.stringify(finalInventory)}`);
    res.send(`${JSON.stringify(newInventory)}`);
  } catch (error) {
    console.log(`Error while reading the json file: ${error}`);
  }
});

module.exports = router;
