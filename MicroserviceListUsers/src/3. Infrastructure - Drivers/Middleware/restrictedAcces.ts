import { NextFunction, Request, Response } from "express";
import { emitWarning } from "process";
import config from "../../config/config";

const restrictedAccessMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.allowedPort !== req.headers.origin) {
    return res.status(401).json({ error: "The access has been denied" });
  } else next();
};

export default restrictedAccessMiddleware;
