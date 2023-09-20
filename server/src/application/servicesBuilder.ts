import { Ranking } from "../domain/Ranking";
import {
  PlayerMongoDbManager,
  RankingMongoDbManager,
} from "../infrastructure/mongoDbManager";

import { PlayerService } from "./PlayerService";
import { RankingService } from "./RankingService";
import { PlayerInterface } from "./PlayerInterface";
import { RankingInterface } from "./RankingInterface";
import { InitDataBase } from "../dataBaseSetup";

export type Dependencias = {
  playerService: PlayerService;
  rankingService: RankingService;
};

export function buildServices(dataBaseConectionDetails: InitDataBase) {
  const ranking = new Ranking();
  let playerManager: PlayerInterface;
  let rankingManager: RankingInterface;

  const playerDocument = dataBaseConectionDetails.document;
  if (!playerDocument) {
    throw new Error("document must exist for mongo");
  }
  playerManager = new PlayerMongoDbManager(playerDocument);
  rankingManager = new RankingMongoDbManager(playerDocument, ranking);

  const playerService = new PlayerService(playerManager);
  const rankingService = new RankingService(rankingManager);
  return { playerService, rankingService };
}
