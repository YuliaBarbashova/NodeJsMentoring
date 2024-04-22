import { Router } from "express";

import { ProductController } from "./controllers/product.controller.ts";
import { CartController } from "./controllers/cart.controller.ts";
import { AuthController } from "./controllers/auth.controller.ts";

const router = Router();

router.use("/products", ProductController);
router.use("/profile/cart", CartController);
router.use("/auth", AuthController);

export default router;
