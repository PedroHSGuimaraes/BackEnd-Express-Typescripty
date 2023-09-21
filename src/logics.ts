import { Request, Response } from "express";
import { marketDataBase } from "./database";

let lastProductId = 0;

export const getProductsInMarket = (req: Request, res: Response) => {
  const totalPrice = marketDataBase.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return res.status(200).json({ total: totalPrice, products: marketDataBase });
};
export const getSpecificProductById = (req: Request, res: Response) => {
  const { id } = req.params;

  const product = marketDataBase.find((product) => product.id === Number(id));

  return res.status(200).json(product);
};

export const createProductInMarket = (req: Request, res: Response) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const newProduct = {
    id: ++lastProductId,
    ...req.body,
    expirationDate: expirationDate.toISOString(),
  };

  marketDataBase.push(newProduct);

  return res.status(201).json(newProduct);
};

export const updateProductData = (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = marketDataBase.find(
    (product) => product.id === Number(id)
  );

  const newProduct = { ...productIndex, ...req.body };

  const index = marketDataBase.findIndex(
    (product) => product.id === Number(id)
  );

  marketDataBase.splice(index, 1, newProduct);

  return res.status(200).json(newProduct);
};

export const deleteProductById = (req: Request, res: Response) => {
  const { id } = req.params;

  const productIndex = marketDataBase.findIndex(
    (product) => product.id === Number(id)
  );

  marketDataBase.splice(productIndex, 1);

  return res.status(204).json({ message: "Product deleted successfully" });
};
