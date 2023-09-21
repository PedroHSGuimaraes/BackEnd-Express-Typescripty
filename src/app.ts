import express from "express";

import {
  getProductsInMarket,
  getSpecificProductById,
  createProductInMarket,
  updateProductData,
  deleteProductById,
} from "./logics";

import { checkProductName, checkProductId } from "./middlewares";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/products", getProductsInMarket);
app.get("/products/:id", checkProductId, getSpecificProductById);
app.post("/products", checkProductName, createProductInMarket);
app.patch("/products/:id", checkProductName, checkProductId, updateProductData);
app.delete("/products/:id", checkProductId, deleteProductById);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
