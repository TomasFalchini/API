import { UserEntity } from "../../1. Entities - Domain/user.entity";
import { UserRepository } from "../../1. Entities - Domain/user.repository";
import { TokenAuthInterface } from "../Authorization/tokenAuthInterface";
import { UserDataSource } from "../Database/User.dataSource";
import { EventBusInterface } from "../EventBus/eventBusInterface";

export class UserImplementationRepository implements UserRepository {
  constructor(
    private readonly userDataSource: UserDataSource,
    private readonly eventBusImplementation: EventBusInterface,
    private readonly tokenAuthImplementation: TokenAuthInterface
  ) {}

  async registerUser({ mail, password }: UserEntity) {
    await this.userDataSource.create({ mail, password });
    await this.eventBusImplementation.publish("new-user-registered", { mail });
    return "The user has been created";
  }

  async userAuthenticate({ mail, password }: UserEntity) {
    const user = await this.userDataSource.findOne({ mail, password });
    return await this.tokenAuthImplementation.sign(user);
  }
}
