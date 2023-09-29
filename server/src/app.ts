import "dotenv/config";
import config from "../config/config";
import { initDataBase } from "./initDB";
import cors from "cors";
import { errorHandler } from "./errorHandler";
import express, { NextFunction, Request, Response, Router } from "express";
import { Express } from "express-serve-static-core";
import { Connection } from "mongoose";
import router from "./routes";
import { IncomingMessage, ServerResponse, createServer, Server } from "http";
import { Server as ServerIo } from "socket.io";
import uuid from "uuid";

export type PlayerRootControllers = {
  createUser: (
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
  socket: ServerIo;
  constructor(server: Server, connection: Connection, socket: ServerIo) {
    this.server = server;
    this.connection = connection;
    this.socket = socket;
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
  //startServer
  const app = express();
  await appSetup(app, router);
  const httpServer = createServer(app);

  const io = new ServerIo(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("login", (userData) => {
      console.log(`User logged in: (ID: ${userData.userId})`);
      const payload = { userData, socketId: socket.id };
      socket.emit("login", payload);
    });
    const count = io.engine.clientsCount;
    console.log(count);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  const server = httpServer.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}! 🍄 `);
  });

  return new Application(server, dataBaseDetails.connectionDetails, io);
}
