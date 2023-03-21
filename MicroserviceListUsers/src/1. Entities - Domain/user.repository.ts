import { InterfaceUserDTO } from "./user.dto";

export interface UserRepository {
  listUsers(
    token: string,
    page: number,
    userXpage: number,
    mail?: string
  ): Promise<InterfaceUserDTO[] | null>;
}
