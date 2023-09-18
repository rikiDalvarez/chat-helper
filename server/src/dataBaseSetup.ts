import config from "../config/config";
import { MongoPlayerType } from "./domain/Player";
import { playerSchema } from "./infrastructure/models/mongoDbModel";
import { connectDatabase } from "./infrastructure/mongoDbConnection";
import { Connection, Model } from "mongoose";

export type InitDataBase = {
  connection: Connection;
  document?: Model<MongoPlayerType>;
};

export async function initDataBase(
  databaseType: string,
  databaseName: string
): Promise<InitDataBase | null> {
  if (databaseType === "mongo") {
    const connection = await connectDatabase(config.MONGO_URI, databaseName).asPromise();
    const playerDocument = connection.model<MongoPlayerType>("Player", playerSchema);
    return Promise.resolve({connection: connection,
      document: playerDocument})
  }
  /* else {
    
    await createSQLDatabase(databaseName, {
      host: config.HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
    });
    const sequelize = createSequelizer(
      databaseName,
      config.MYSQL_USER,
      config.MYSQL_PASSWORD,
      config.HOST
    );
    initializeGameTable(sequelize);
    initializePlayerTable(sequelize);
    await createSQLTableRelations(sequelize);
    
    return Promise.resolve({ connection: "sequelize" });
  }*/
  return null
}