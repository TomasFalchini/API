import UserValueObject from "../../1. Entities - Domain/user.valueObject";

export interface UserDataSource {
  create(user: UserValueObject): Promise<void>;
  findOne(user: UserValueObject): Promise<UserValueObject>;
}
