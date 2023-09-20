import "dotenv/config";
import config from "../config/config";
import { buildServices } from "./application/servicesBuilder";
import { initDataBase } from "./dataBaseSetup";
import cors from "cors";
import { initRoutes } from "./routes";
import { errorHandler } from "./errorHandler";
import express, { NextFunction, Request, Response, Router } from "express";
import { Express } from "express-serve-static-core";
import {
  playerControllers,
  rankingControllers,
} from "./application/controller";
import { Server } from "http";
import { Connection } from "mongoose";

export type PlayerRootControllers = {
  handleLogin: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  postPlayer: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  changeName: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  getPlayers: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  addGame: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  deleteAllGames: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  getGames: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
};

export type RankingRootControllers = {
  getRankingWithAverage: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getLoser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getWinner: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

// start an app with server and connection
export class Application {
  server: Server;
  connection: Connection;
  constructor(server: Server, connection: Connection) {
    this.server = server;
    this.connection = connection;
  }

  public stop() {
    this.server.close();
    this.connection.close();
  }
}

//start server for app or to test integration tests
export async function applicationStart() {
  const databaseName =
    config.NODE_ENV === "test" ? config.TEST_DATABASE : config.DATABASE;
  return startServer(databaseName);
}

// set up middlewares
export async function appSetup(app: Express, router: Router) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response,
      next: NextFunction
    ) => {
      errorHandler(error, response, next);
    }
  );
}

async function startServer(databaseName: string) {
  //startDatabase
  const dataBaseDetails = await initDataBase(databaseName);

  //initialize services depending on DATABASE
  const { playerService, rankingService } = buildServices(dataBaseDetails);

  const playerRootControllers = playerControllers(playerService);
  const rankingRootControllers = rankingControllers(rankingService);
  const app = express();
  const router = express.Router();
  await initRoutes(router, playerRootControllers, rankingRootControllers);
  await appSetup(app, router);

  const server = app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}! 🍄 `);
  });

  return new Application(server, dataBaseDetails.connection);
}
