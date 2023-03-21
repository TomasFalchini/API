import { UserRepository } from "../1. Entities - Domain/user.repository";
import UserValueObject from "../1. Entities - Domain/user.valueObject";

export class UserServices {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(user: UserValueObject) {
    const response = await this.userRepository.registerUser(user);
    return response;
  }

  async authenticateUser(user: UserValueObject) {
    const response = await this.userRepository.userAuthenticate(user);
    return response;
  }
}

export interface InterfaceUserServices extends UserServices {}
