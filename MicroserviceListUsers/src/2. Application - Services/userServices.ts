import { UserRepository } from "../1. Entities - Domain/user.repository";

export class UserServices {
  constructor(private readonly userRepository: UserRepository) {}

  async listUsers(
    token: string,
    page: number,
    userXpage: number,
    mail?: string
  ) {
    const response = await this.userRepository.listUsers(
      token,
      page,
      userXpage,
      mail
    );
    return response;
  }
}

export interface InterfaceUserServices extends UserServices {}
