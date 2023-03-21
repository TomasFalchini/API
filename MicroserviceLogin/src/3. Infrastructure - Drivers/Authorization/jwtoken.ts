import config from "../../config/config";
import jwt from "jsonwebtoken";
import UserValueObject from "../../1. Entities - Domain/user.valueObject";
import { TokenAuthInterface } from "./tokenAuthInterface";
import { ErrorWithStatus } from "../../types";

export class JWTokenAuth implements TokenAuthInterface {
  async sign(user: UserValueObject) {
    let token: string = "";
    try {
      token = jwt.sign(user, config.jwtKey, {
        expiresIn: 3600 * 1000 * 2,
      });

      return token;
    } catch (err) {
      throw new Error("There was an error seting up the token");
    }
  }

  verify(token: string) {
    try {
      return jwt.verify(token, config.jwtKey);
    } catch (err) {
      throw new Error("There was an error validating the token");
    }
  }
}
