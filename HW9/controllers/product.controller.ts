import express = require("express");
import { ProductService } from "../services/product.service.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const ProductController = express.Router();

ProductController.get("/", authMiddleware, async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.json({ data: products, error: null });
});

ProductController.get(
  "/:productId",
  authMiddleware,
  async (req, res) => {
    const product = await ProductService.getProduct(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .send({ data: null, error: { message: "No product with such id" } });
    }
    res.json({ data: product, error: null });
  }
);

export { ProductController };
