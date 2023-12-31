import { UserInterface } from "../application/UserInterface";
import { MongoUserType, User, IRoom } from "../domain/User";
import mongoose, { Model } from "mongoose";
import { mongo } from "mongoose";

export class UserMongoDbManager implements UserInterface {
  private userDocument: Model<MongoUserType>;

  constructor(userDocument: Model<MongoUserType>) {
    this.userDocument = userDocument;
  }

  // createPlayerDoc(player: Player) {
  //   return {
  //     id: player.id,
  //     email: player.email,
  //     password: player.password,
  //     registrationDate: player.registrationDate,
  //     games: player.games,
  //     name: player.name,
  //     successRate: player.successRate,
  //   };
  // }

  validationErrorHandler(err: mongoose.Error.ValidationError) {
    if (err.errors.email instanceof mongoose.Error.ValidatorError) {
      throw new Error("EmailInvalidError");
    }
    throw err;
  }

  async createUser(user: User): Promise<string> {
    const newPlayer = {
      email: user.email,
      password: user.password,
      name: user.name,
      games: [],
      successRate: 0,
      registrationDate: user.registrationDate,
    };
    try {
      const playerFromDB = await this.userDocument.create(newPlayer);
      return playerFromDB.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        this.validationErrorHandler(err);
      } else if (err instanceof mongo.MongoServerError) {
        this.uniqueViolationErrorHandler(err);
      }
      throw err;
    }
  }

  uniqueViolationErrorHandler(err: mongo.MongoServerError) {
    const isUniqueViolation = err.code === 11000;
    if (isUniqueViolation && err.errmsg.includes("email")) {
      throw new Error("EmailConflictError");
    }
    if (isUniqueViolation && err.errmsg.includes("name")) {
      throw new Error("NameConflictError");
    }
    throw err;
  }

  async findUserById(playerID: string): Promise<User> {
    const userDetails = await this.userDocument.findById(playerID);
    if (!userDetails) {
      throw new Error("PlayerNotFound");
    }
    console.log(userDetails);
    const { name, email, password, rooms, id, registrationDate } = userDetails;
    const user = new User(name, email, password, rooms, id);
    user.registrationDate = registrationDate;
    return user;
  }

  async findUserByEmail(playerEmail: string): Promise<User> {
    const userDetails = await this.userDocument.findOne({
      email: playerEmail,
    });
    if (!userDetails) {
      throw new Error("EmailNotExists");
    }
    const { name, email, password, rooms, id } = userDetails;
    return new User(name, email, password, rooms, id);
  }

  async getUserList(): Promise<User[]> {
    const usersFromDB = await this.userDocument.find({});
    console.log({ usersFromDB });
    const users = usersFromDB.map((userFromDB) => {
      const { name, email, password, rooms, id, registrationDate } = userFromDB;
      const user = new User(name, email, password, rooms, id);
      user.registrationDate = registrationDate;
      return user;
    });
    return users;
  }

  async getRoomList(): Promise<IRoom[]> {
    const rooms = await this.userDocument.find({}).select("rooms");
    const uniqueNames = new Set();

    // Use the filter method to keep only objects with unique 'name' values
    const onlyRooms = rooms.map((room) => room.rooms).flat();
    console.log({ onlyRooms });

    const uniqueRooms = onlyRooms.filter((room) => {
      console.log({ room });
      if (!uniqueNames.has(room.name)) {
        uniqueNames.add(room.name);

        return true;
      }
      return false;
    });
    console.log({ uniqueRooms });
    return uniqueRooms;
  }

  async addRoom(playerId: string, roomName: string): Promise<Partial<User>> {
    try {
      let userOld = await this.findUserById(playerId);

      const room = { name: roomName, participants: [playerId], messages: [] };
      const user = await this.userDocument.findByIdAndUpdate(playerId, {
        rooms: [...userOld.rooms, room],
      });
      if (!user) {
        throw new Error("changeNameError");
      }
      console.log("from manager", user);
      return user;
    } catch (err) {
      if (err instanceof mongo.MongoServerError) {
        this.uniqueViolationErrorHandler(err);
      }
      throw err;
    }
  }

  // async addGame(player: Player): Promise<GameType> {
  //   const id = player.id;
  //   const response = await this.userDocument.replaceOne(
  //     { _id: { $eq: id } },
  //     this.createPlayerDoc(player)
  //   );
  //   if (response.modifiedCount === 1) {
  //     const lastGame = player.games[player.games.length - 1];
  //     return lastGame;
  //   }
  //   throw new Error("AddingGameError");
  // }

  // async deleteAllGames(player: Player): Promise<boolean> {
  //   const id = player.id;

  //   const response = await this.playerDocument.replaceOne(
  //     { _id: { $eq: id } },
  //     this.createPlayerDoc(player)
  //   );
  //   if (response.modifiedCount === 1) {
  //     return true;
  //   }
  //   throw new Error(`DeletionError`);
  // }

  // async getGames(playerId: string): Promise<Array<GameType>> {
  //   const player = await this.playerDocument.findById(playerId);
  //   if (!player) {
  //     throw new Error("PlayerNotFound");
  //   }
  //   return player ? player.games : [];
  // }
}
