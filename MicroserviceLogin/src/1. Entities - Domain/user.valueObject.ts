import { UserEntity } from "./user.entity";

class UserValueObject implements UserEntity {
  mail: string;
  password: string;

  constructor({ mail, password }: UserEntity) {
    this.mail = mail;
    this.password = password;
  }
}

export interface InterfaceUserValueObject extends UserValueObject {}

export default UserValueObject;
