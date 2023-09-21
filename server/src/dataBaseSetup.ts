// Default imports (using mongoDB)
import config from "../config/config";
import { MongoUserType } from "./domain/User";
import { userSchema } from "./infrastructure/models/mongoDbModel";
import { connectDatabase } from "./infrastructure/mongoDbConnection";
import { Connection, Model } from "mongoose";

export type InitDataBase = {
  connection: Connection | any;
  document?: Model<MongoUserType>;
};

export async function initDataBase(
  databaseName: string
): Promise<InitDataBase> {
  const connection = await connectDatabase(
    config.MONGO_URI,
    databaseName
  ).asPromise();
  const playerDocument = connection.model<MongoUserType>("User", userSchema);
  return Promise.resolve({
    connection: connection,
    document: playerDocument,
  });
}
