import { User } from "../domain/User";

export interface PlayerInterface {
  createUser(user: User): Promise<string>; // return user_id
  // changeName(playerId: string, newName: string): Promise<Partial<Player>>;
  // addGame(playerDetails: Player): Promise<GameType>;
  // deleteAllGames(playerDetails: Player): Promise<boolean>;
  // findPlayer(playerId: string): Promise<Player>;
  // findPlayerByEmail(playerEmail: string): Promise<Player>;
  // getPlayerList(): Promise<PlayerList>;
  // getGames(playerId: string): Promise<Array<GameType>>;
}
