import UserDTO from "../../1. Entities - Domain/user.dto";

export interface UserDataSource {
  getListOfUsers(
    page: number,
    usersPerPage: number,
    mail?: string
  ): Promise<UserDTO[]>;
}
