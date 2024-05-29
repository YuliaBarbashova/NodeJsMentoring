import express = require("express");
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { UserService } from "../services/user.service.ts";
import {
  validateBody,
  newUserSchema,
  currentUserSchema,
} from "../validators/index.ts";
import { UserEntity } from "../types/index.ts";
import { logger } from "../logger.ts";

const AuthController = express.Router();

AuthController.post(
  "/register",
  validateBody(newUserSchema),
  async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
      const oldUser = await UserService.getUser({ email });
      if (oldUser) {
        logger.error("User Already Exist. Please Login");
        return res.status(409).send("User Already Exist. Please Login");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = (await UserService.createNewUser(
        email.toLowerCase(),
        encryptedPassword,
        role
      )) as Partial<UserEntity>;

      return res.status(201).json({
        data: { role: user.role, email: user.email, id: user._id },
        error: null,
      });
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
      const user = await UserService.getUser({
        email: req.body.email,
      });

      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.TOKEN_KEY!,
          {
            expiresIn: "2h",
          }
        );

        return res.status(200).json({ data: { token }, error: null });
      }

      return res.status(404).send({
        data: null,
        error: { message: "No user with such email or password" },
      });
    } catch (err) {
      next(err);
    }
  }
);

export { AuthController };
