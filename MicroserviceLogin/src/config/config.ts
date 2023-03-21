import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default {
  dbConnection: process.env.DB_MONGO_CONNENCTION || "",
  host: process.env.HOST || "127.0.0.1",
  port: process.env.PORT || 8080,
  env: "development",
  jwtKey: process.env.JWT_KEY || "",
  kafka: {
    key: process.env.KAFKA_KEY || "",
    secret: process.env.KAFKA_SECRET || "",
  },
};
