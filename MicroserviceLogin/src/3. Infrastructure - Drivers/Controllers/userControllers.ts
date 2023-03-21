import axios from "axios";
import { Request, Response, NextFunction } from "express";
import UserDTO from "../../1. Entities - Domain/user.dto";
import { InterfaceUserServices } from "../../2. Application - Services/userServices";
import config from "../../config/config";
import { ErrorWithStatus } from "../../types";

export class UserController {
  constructor(private userServices: InterfaceUserServices) {}

  registerCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const { mail, password } = req.body;
    try {
      const result = await this.userServices.registerUser({ mail, password });
      return res.status(200).send({ result });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };

  authenticateCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { mail, password } = req.body;
      const token = await this.userServices.authenticateUser({
        mail,
        password,
      });
      return res.status(200).send({ token });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };

  listCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).send({ error: "Not authorized" });
      }
      const { page, userXpage, mail } = req.query;
      const response = await axios.get(
        `http://localhost:8080/list?page=${page}&userXpage=${userXpage}&mail=${
          mail || ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            origin: config.port,
          },
        }
      );
      const users: UserDTO[] = response.data.users;

      return res.status(200).send({ users });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
