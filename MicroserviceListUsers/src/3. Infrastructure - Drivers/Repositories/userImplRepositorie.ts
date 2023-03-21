import { UserRepository } from "../../1. Entities - Domain/user.repository";
import { TokenAuthInterface } from "../Authorization/tokenAuthInterface";
import { UserDataSource } from "../Database/user.dataSource";

export class UserImplementationRepository implements UserRepository {
  constructor(
    private readonly userDataSource: UserDataSource,
    private readonly tokenAuthImplementation: TokenAuthInterface
  ) {}

  listUsers = async (
    token: string,
    page: number,
    userXpage: number,
    mail?: string
  ) => {
    const access = this.tokenAuthImplementation.verify(token);
    if (!access) {
      throw new Error("Token unauthoraized");
    }
    const listOfUsers = await this.userDataSource.getListOfUsers(
      page,
      userXpage,
      mail
    );
    return listOfUsers;
  };
}
