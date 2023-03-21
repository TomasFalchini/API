import mongoose from "mongoose";
import UserValueObject from "../../1. Entities - Domain/user.valueObject";
import config from "../../config/config";
import { userModel } from "./Schemas";
import { UserDataSource } from "./User.dataSource";

class MongooseDataSource implements UserDataSource {
  private db: any;

  constructor() {
    this.db = null;
  }

  initDb = async () => {
    if (this.db) {
      return;
    }
    try {
      mongoose.set("strictQuery", true);
      const res = await mongoose.connect(
        `mongodb+srv://usuariodeprueba:${config.dbConnection}@cluster0.fv06faq.mongodb.net/?retryWrites=true&w=majority`
      );
      this.db = res.connection;
      console.log("database connected");
    } catch (err) {
      throw new Error(`Error on database connection: ${err}`);
    }
  };

  closeDb = async () => {
    try {
      await this.db.close();
    } catch (err) {
      throw new Error(`Error on database close: ${err}`);
    } finally {
      this.db = null;
      console.log("database connection closed");
    }
  };

  create = async (user: UserValueObject) => {
    await this.initDb();
    if (!this.db) {
      throw new Error(`Missing connection`);
    }
    try {
      const userInDB = await userModel.findOne({ mail: user.mail });

      if (userInDB) {
        throw new Error(`User already exists`);
      }
      const newUser = new userModel(user);
      await newUser.save();
    } catch (err) {
      throw new Error(`An Error just happened: ${err}`);
    } finally {
      this.closeDb();
    }
  };

  findOne = async (user: UserValueObject) => {
    await this.initDb();
    if (!this.db) {
      throw new Error(`Missing connection`);
    }
    try {
      const userInDB = await userModel.findOne(user);
      if (userInDB) {
        const userObject = userInDB.toObject();
        return {
          mail: userObject.mail,
          password: userObject.password,
        };
      }
      throw new Error(`There aren't any user with those credentials`);
    } catch (err) {
      throw new Error(`An Error just happened: ${err}`);
    } finally {
      this.closeDb();
    }
  };
}

export default MongooseDataSource;
