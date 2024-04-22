import express = require("express");
import jwt from "jsonwebtoken";

import { UserService } from "../services/user.service.ts";
import {
  validateBody,
  newUserSchema,
  currentUserSchema,
} from "../validators/index.ts";
import { UserEntity } from "../types/index.ts";

const AuthController = express.Router();

AuthController.post(
  "/register",
  validateBody(newUserSchema),
  async (req, res, next) => {
    try {
      const user = (await UserService.createNewUser(
        req.body.email,
        req.body.password,
        req.body.role
      )) as Partial<UserEntity>;

      delete user.password;
      return res.status(201).json({ data: user, error: null });
    } catch (err) {
      next(err);
    }
  }
);

AuthController.post(
  "/login",
  validateBody(currentUserSchema),
  async (req, res, next) => {
    try {
      const user = await UserService.getUser(req.body.email, req.body.password);

      if (!user) {
        return res.status(404).send({
          data: null,
          error: { message: "No user with such email or password" },
        });
      }
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
        expiresIn: "1h",
      }); 
      res.json({ data: { token }, error: null });
    } catch (err) {
      next(err);
    }
  }
);

export { AuthController };
