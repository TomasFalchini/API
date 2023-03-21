import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "../../types";

const errorMiddleware = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  return res.status(status).json({ error: err.message });
};

export default errorMiddleware;
