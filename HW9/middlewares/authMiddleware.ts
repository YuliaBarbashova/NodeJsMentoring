import express from "express";
import jwt from "jsonwebtoken";

import { findUserById } from "../repositories/index.ts";
import { logger } from "../logger.ts";
export interface CurrentUser {
  id: string;
  email: string;
  role: string;
}
interface MyRequest extends Request {
  user?: CurrentUser; // или используйте свой фактический тип, вместо 'any'
}

export const authMiddleware: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.error("Token is required");
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    logger.error("Invalid Token");
    return res.status(401).send("Invalid Token");
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
    const existingUser = await findUserById(user.id);

    if (!existingUser) {
      logger.error("User is not exist");
      return res.status(403).send("User is not exist");
    }

    (req as unknown as MyRequest).user = user;
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      return res.status(401).send(err.message);
    }
  }

  next();
};
