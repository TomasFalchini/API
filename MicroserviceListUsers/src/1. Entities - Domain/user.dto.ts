import { UserEntity } from "./user.entity";

class UserDTO {
  mail: string;

  constructor({ mail }: UserEntity) {
    this.mail = mail;
  }
}

export interface InterfaceUserDTO extends UserDTO {}

export default UserDTO;
