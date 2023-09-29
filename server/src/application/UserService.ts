import { User, IRoom } from "../domain/User";
import { UserInterface } from "./UserInterface";

/*
service = new PlayerService(playerInterface)
service.createUser(user)
*/

export class UserService {
  userInterface: UserInterface;
  constructor(userInterface: UserInterface) {
    this.userInterface = userInterface;
  }

  createUser(user: User): Promise<string> {
    return this.userInterface.createUser(user);
  }

  // changeName(playerId: string, newName: string): Promise<Partial<Player>> {
  //   return this.playerInterface.changeName(playerId, newName);
  // }

  findUserById(userID: string): Promise<User> {
    return this.userInterface.findUserById(userID);
  }

  findUserByEmail(userEmail: string): Promise<User> {
    return this.userInterface.findUserByEmail(userEmail);
  }

  getUserList(): Promise<Array<User>> {
    return this.userInterface.getUserList();
  }
  getRoomList(): Promise<Array<IRoom>> {
    return this.userInterface.getRoomList();
  }

  async addRoom(userId: string, roomName: string): Promise<Partial<User>> {
    return this.userInterface.addRoom(userId, roomName);
  }

  // deleteAllGames(playerDetails: Player): Promise<boolean> {
  //   return this.playerInterface.deleteAllGames(playerDetails);
  // }

  // getGames(playerId: string): Promise<Array<GameType>> {
  //   return this.playerInterface.getGames(playerId);
  // }

  // getPlayerList(): Promise<PlayerList> {
  //   return this.playerInterface.getPlayerList();
  // }
}
