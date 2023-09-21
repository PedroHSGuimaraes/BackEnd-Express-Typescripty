import { Request, Response, NextFunction } from "express";
import { marketDataBase } from "./database";


export const checkProductName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (marketDataBase.find((product) => product.name === name)) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

export const checkProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!marketDataBase.some((product) => product.id === Number(id))) {
    return res.status(404).json({ message: "Product not found." });
  }

  return next();
};
