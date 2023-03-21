import { Request, Response, NextFunction } from "express";
import { InterfaceUserServices } from "../../2. Application - Services/userServices";

export class UserController {
  constructor(private userServices: InterfaceUserServices) {}

  listCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).send({ error: "Not authorized" });
      }
      const { page, userXpage, mail } = req.query;

      if (
        typeof page !== "string" ||
        typeof userXpage !== "string" ||
        (mail && typeof mail !== "string")
      ) {
        return res.status(404).send({ error: "Invalid querys" });
      }

      const users = await this.userServices.listUsers(
        token,
        parseInt(page),
        parseInt(userXpage),
        mail
      );
      return res.status(200).send({ users });
    } catch (err) {
      next(err);
    }
  };
}
