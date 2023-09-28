import { User } from "../domain/User";

export interface UserInterface {
  createUser(user: User): Promise<string>; // return user_id
  findUserByEmail(playerEmail: string): Promise<User>;
  // changeName(playerId: string, newName: string): Promise<Partial<Player>>;
  // addGame(playerDetails: Player): Promise<GameType>;
  // deleteAllGames(playerDetails: Player): Promise<boolean>;
  findUserById(playerId: string): Promise<User>;
  // getPlayerList(): Promise<PlayerList>;
  // getGames(playerId: string): Promise<Array<GameType>>;
}
