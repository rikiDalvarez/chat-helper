import { User } from "../domain/User";

export interface PlayerInterface {
  createPlayer(user: User): Promise<string>;
  // changeName(playerId: string, newName: string): Promise<Partial<Player>>;
  // addGame(playerDetails: Player): Promise<GameType>;
  // deleteAllGames(playerDetails: Player): Promise<boolean>;
  // findPlayer(playerId: string): Promise<Player>;
  // findPlayerByEmail(playerEmail: string): Promise<Player>;
  // getPlayerList(): Promise<PlayerList>;
  // getGames(playerId: string): Promise<Array<GameType>>;
}
