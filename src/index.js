const express = require("express");
const inventory = require("./routes/inventory");
const products = require("./routes/products");

try {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/inventory", inventory);
  app.use("/products", products);

  app.listen(process.env.PORT, () =>
    console.log(
      `server running on port ${!process.env.PORT ? 5000 : process.env.PORT}`
    )
  );
} catch (error) {
  console.log(`Server crashed with error: ${error}`);
}
