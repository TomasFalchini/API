import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ error: err.message });
};

export default errorMiddleware;
