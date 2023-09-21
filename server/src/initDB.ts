// Default imports (using mongoDB)
import config from "../config/config";
import { MongoUserType } from "./domain/User";
import { userSchema } from "./infrastructure/models/mongoDbModel";
import { connectDatabase } from "./infrastructure/mongoDbConnection";
import { UserMongoDbManager } from "./infrastructure/mongoDbManager";
import { UserService } from "./application/UserService";
import { Connection, Model } from "mongoose";

export let userDocument: Model<MongoUserType>;
export let userService: unknown;

export const initDataBase = async () => {
  const connectionDetails = connectDatabase(config.MONGO_URI, config.DATABASE);
  userDocument = connectionDetails.model<MongoUserType>("User", userSchema);
  const mongoDbManager = new UserMongoDbManager(userDocument);
  userService = new UserService(mongoDbManager);
  return { userDocument, userService };
};
