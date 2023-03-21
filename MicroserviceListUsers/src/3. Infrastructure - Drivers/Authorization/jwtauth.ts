import config from "../../config/config";
import jwt from "jsonwebtoken";
import { TokenAuthInterface } from "./tokenAuthInterface";

export class JWTokenAuth implements TokenAuthInterface {
  verify(token: string) {
    try {
      return jwt.verify(token, config.jwtKey);
    } catch (err) {
      throw new Error("There was an error validating the token");
    }
  }
}
