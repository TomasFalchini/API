import mongoose from "mongoose";
import UserDTO from "../../1. Entities - Domain/user.dto";
import config from "../../config/config";
import { userModel } from "./Schemas";
import { UserDataSource } from "./user.dataSource";

class MongooseDataSource implements UserDataSource {
  private db: any;

  constructor() {
    this.db = null;
  }

  private initDb = async () => {
    if (this.db) {
      return;
    }
    try {
      mongoose.set("strictQuery", true);
      const res = await mongoose.connect(
        `mongodb+srv://usuariofalchini:${config.dbConnection}@cluster1.rlhub0y.mongodb.net/?retryWrites=true&w=majority`
      );
      this.db = res.connection;
      console.log("database connected");
    } catch (err) {
      throw new Error(`Error on database connection: ${err}`);
    }
  };

  private closeDb = async () => {
    try {
      await this.db.close();
    } catch (err) {
      throw new Error(`Error on database close: ${err}`);
    } finally {
      this.db = null;
      console.log("database connection closed");
    }
  };

  getListOfUsers = async (
    page: number,
    usersXpage: number,
    mail?: string
  ): Promise<UserDTO[]> => {
    await this.initDb();
    if (!this.db) {
      throw new Error(`Missing connection`);
    }
    try {
      if (mail) {
        return await userModel
          .find({ mail })
          .skip((page - 1) * usersXpage)
          .limit(usersXpage);
      }

      const users = await userModel
        .find()
        .skip((page - 1) * usersXpage)
        .limit(usersXpage);

      return users;
    } catch (err) {
      throw new Error(`An Error just happened: ${err}`);
    } finally {
      this.closeDb();
    }
  };
}

export default MongooseDataSource;
