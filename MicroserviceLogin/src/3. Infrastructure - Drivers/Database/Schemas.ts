import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../../1. Entities - Domain/user.entity";

const userSchema = new Schema<UserEntity>({
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<UserEntity>("user", userSchema);

export { userModel };
