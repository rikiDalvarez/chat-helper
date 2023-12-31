import { User, IRoom } from "../domain/User";

export interface UserInterface {
  createUser(user: User): Promise<string>; // return user_id
  findUserByEmail(userEmail: string): Promise<User>;
  // changeName(playerId: string, newName: string): Promise<Partial<Player>>;
  addRoom(userId: string, roomName: string): Promise<Partial<User>>;
  // deleteAllGames(playerDetails: Player): Promise<boolean>;
  findUserById(userId: string): Promise<User>;
  getUserList(): Promise<Array<User>>;
  getRoomList(): Promise<Array<IRoom>>;
  // getPlayerList(): Promise<PlayerList>;
  // getGames(playerId: string): Promise<Array<GameType>>;
}
