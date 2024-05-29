import { Request, Response, NextFunction } from "express";

import { logger } from "../logger.ts";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.stack);
  res.status(500).json({
    data: null,
    error: {
      message: "Internal Server Error",
    },
  });
}
