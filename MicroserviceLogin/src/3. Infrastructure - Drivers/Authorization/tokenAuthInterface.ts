import UserValueObject from "../../1. Entities - Domain/user.valueObject";

export interface TokenAuthInterface {
  sign: (user: UserValueObject) => Promise<string>;
  verify: (token: string) => any;
}
