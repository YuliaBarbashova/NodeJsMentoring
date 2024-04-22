import Joi, { Schema, ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        data: null,
        error: {
          message: (error as ValidationError).details[0].message,
        },
      });
    }
  };
};
