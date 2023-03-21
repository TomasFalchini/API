import { InterfaceUserDTO } from "./user.dto";
import { UserEntity } from "./user.entity";

export interface UserRepository {
  registerUser({ mail, password }: UserEntity): Promise<string>;
  userAuthenticate({ mail, password }: UserEntity): Promise<string | null>;
}
