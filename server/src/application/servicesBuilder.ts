import { PlayerMongoDbManager } from "../infrastructure/mongoDbManager";

import { PlayerService } from "./PlayerService";
import { PlayerInterface } from "./PlayerInterface";
import { InitDataBase } from "../dataBaseSetup";

export type Dependencias = {
  playerService: PlayerService;
};

export function buildServices(dataBaseConectionDetails: InitDataBase) {
  let playerManager: PlayerInterface;

  const playerDocument = dataBaseConectionDetails.document;
  if (!playerDocument) {
    throw new Error("document must exist for mongo");
  }
  playerManager = new PlayerMongoDbManager(playerDocument);

  const playerService = new PlayerService(playerManager);
  return { playerService };
}
