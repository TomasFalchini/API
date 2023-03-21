import UserDTO, { InterfaceUserDTO } from "../../1. Entities - Domain/user.dto";

export interface EventBusInterface {
  connect: () => any;
  publish: (chanel: string, data: UserDTO, ...rest: any) => Promise<void>;
}
