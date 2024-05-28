import { Router } from "express";

import { CartService } from "../services/cart.service.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";
import { CartEntity, OrderEntity } from "../types/index.ts";
import { validateBody, cartSchema } from "../validators/index.ts";

const CartController = Router();

CartController.get("/", authMiddleware, async (req, res, next) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    let cart: CartEntity | null = await CartService.getUserCart(userId);

    if (!cart) {
      cart = await CartService.createCart(userId);
    }

    return res.status(200).json({
      data: {
        cart,
        total: cart.items.reduce(
          (total, item) => total + item.product.price * item.count,
          0
        ),
      },
      error: null,
    });
  } catch (err) {
    next(err);
  }
});

CartController.put(
  "/",
  authMiddleware,
  validateBody(cartSchema),
  async (req, res, next) => {
    const userId = req.headers["x-user-id"] as string;
    const { productId, count }: { productId: string; count: number } = req.body;
    try {
      let cart: CartEntity | null = await CartService.updateUserCart(
        userId,
        productId,
        count
      );
      return res.status(200).json({
        data: {
          cart,
          total: cart?.items.reduce(
            (total, item) => total + item.product?.price * item.count,
            0
          ),
        },
        error: null,
      });
    } catch (err) {
      if ((err as Error).message === "Product not found") {
        return res.status(404).json({
          data: null,
          error: {
            message: "Product not found",
          },
        });
      } else {
        next(err);
      }
    }
  }
);

CartController.delete("/", authMiddleware, isAdmin, async (req, res, next) => {
  const { userId }: { userId: string} = req.body;

  try {
    await CartService.clearCart(userId);

    return res.status(200).json({
      data: { success: true },
      error: null,
    });
  } catch (err) {
    if ((err as Error).message === "Cart not found") {
      return res.status(404).json({
        data: null,
        error: {
          message: "Cart not found",
        },
      });
    } else {
      next(err);
    }
  }
});

CartController.post("/checkout", authMiddleware, async (req, res, next) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const order: OrderEntity | null = await CartService.createOrder(userId);

    if (!order) {
      return res.status(400).json({
        data: null,
        error: { message: "Cart is empty" },
      });
    }

    return res.status(200).json({
      data: { order },
      error: null,
    });
  } catch (err) {
    if ((err as Error).message === "Cart not found") {
      return res.status(404).json({
        data: null,
        error: {
          message: "Cart not found",
        },
      });
    } else {
      next(err);
    }
  }
});

export { CartController };
