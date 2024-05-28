import { Request, Response, NextFunction } from "express";

export interface CurrentUser {
  id: string;
  email: string;
  role: string;
}
interface MyRequest extends Request {
  user?: CurrentUser; // или используйте свой фактический тип, вместо 'any'
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = (req as unknown as MyRequest).user;

  if (currentUser?.role !== "admin") {
    return res.status(403).send("Only admins can remove carts");
  }
  next();
};
