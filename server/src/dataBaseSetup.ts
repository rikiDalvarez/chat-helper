
// SQL IMPORTS TO USE SQL
// @ts-ignore
import { Sequelize } from "sequelize/types/sequelize";
// @ts-ignore
import { initializeGameTable } from "./infrastructure/models/mySQLModels/GameMySQLModel";
// @ts-ignore
import { initializePlayerTable } from "./infrastructure/models/mySQLModels/PlayerMySQLModel";
// @ts-ignore
import { createSQLTableRelations } from "./infrastructure/models/mySQLModels/tableRelations";
import { createSQLDatabase, createSequelizer } from "./infrastructure/mySQLConnection";


// Default imports (using mongoDB)
import config from "../config/config";
import { MongoPlayerType } from "./domain/Player";
import { playerSchema } from "./infrastructure/models/mongoDbModel";
import { connectDatabase } from "./infrastructure/mongoDbConnection";
import { Connection, Model } from "mongoose";

export type InitDataBase = {
  connection: Connection | Sequelize;
  document?: Model<MongoPlayerType>;
};

export async function initDataBase(
  databaseType: string,
  databaseName: string
): Promise<InitDataBase> {
  if (databaseType === "mongo") {
    const connection = await connectDatabase(config.MONGO_URI, databaseName).asPromise();
    const playerDocument = connection.model<MongoPlayerType>("Player", playerSchema);
    return Promise.resolve({
      connection: connection,
      document: playerDocument,
    });
  } else {
    
    await createSQLDatabase(databaseName, {
      // @ts-ignore
      host: config.HOST,
      // @ts-ignore
      user: config.MYSQL_USER,
      // @ts-ignore
      password: config.MYSQL_PASSWORD,
    });
    const sequelize = createSequelizer(
      databaseName,
      // @ts-ignore
      config.MYSQL_USER,
      config.MYSQL_PASSWORD,
      config.HOST
    );
    initializeGameTable(sequelize);
    initializePlayerTable(sequelize);
    await createSQLTableRelations(sequelize);
    return Promise.resolve({ connection: sequelize });
  }
}