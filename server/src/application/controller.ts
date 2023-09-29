// import { PlayerDocument } from "./mongoDbModel";
import { Request, Response, NextFunction } from "express";
import { User } from "../domain/User";
import { userService } from "../initDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizedConfig from "../../config/config";
import { ObjectId } from "mongodb";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, hashedPassword, [], new ObjectId());
    const playerId = await userService.createUser(newUser);
    return res.status(201).json({ Player_id: playerId });
  } catch (error) {
    next(error);
  }
};

export const loginHandle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "no user found with this email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "authentication failed" });
    }

    const payload = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    };

    const token = jwt.sign(payload, sanitizedConfig.JWT_SECRET, {
      expiresIn: "600s",
    });
    return res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roomName, id } = req.body;
  try {
    const user = await userService.addRoom(id, roomName);
    console.log({ user });

    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const getUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getUserList()
    .then((users) => {
      if (users) {
        return res.status(200).json(users);
      }
    })
    .catch((err) => {
      next(err);
      //in which scenario we will return this and what will be err.message???
      //return res.status(404).json({ error: err.message, error_code: "GP001" });
    });
};

//   const postPlayer = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (!("email" in req.body) || !("password" in req.body)) {
//       return res
//         .status(400)
//         .json({ Bad_reqest: "email and password required" });
//     }
//     const { email, password, name } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User(email, hashedPassword, name);
//     playerService
//       .createPlayer(newUser)
//       .then((response) => {
//         return res.status(201).json({ Player_id: response });
//       })
//       .catch((err: Error) => {
//         next(err);
//       });
//   };

//   const addGame = async (req: Request, res: Response, next: NextFunction) => {
//     const playerId = req.params.id;
//     try {
//       const responseFromDatabase = await playerService.addGame(playerId);
//       return res.status(200).json(responseFromDatabase);
//     } catch (err) {
//       next(err);
//     }
//   };

//   const deleteAllGames = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const playerId = req.params.id;
//     try {
//       const player = await playerService.findPlayer(playerId);
//       player.deleteGames();
//       const responseFromDatabase = await playerService.deleteAllGames(player);
//       return res.status(200).json({ games_deleted: responseFromDatabase });
//     } catch (err) {
//       next(err);
//     }
//   };

//   const changeName = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const playerId = req.params.id;
//     const newName = req.body.name;
//     try {
//       const player = await playerService.changeName(playerId, newName);
//       return res.status(200).json(player);
//     } catch (err) {
//       next(err);
//     }
//   };

//   const getGames = async (req: Request, res: Response, next: NextFunction) => {
//     const playerId = req.params.id;
//     try {
//       const games = await playerService.getGames(playerId);
//       return res.send(games);
//     } catch (error) {
//       next(error);
//     }
//   };

//   return {
//     handleLogin,
//     postPlayer,
//     changeName,
//     getPlayers,
//     addGame,
//     deleteAllGames,
//     getGames,
//   };
// }

// export function rankingControllers(rankingService: RankingService) {
//   const getRankingWithAverage = async (req: Request, res: Response) => {
//     try {
//       const ranking = await rankingService.getRankingWithAverage();

//       res
//         .status(200)
//         .json({ ranking: ranking.rankingList, average: ranking.average });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: "Error getting ranking", error_code: "GR001" });
//     }
//   };

//   const getWinner = async (req: Request, res: Response) => {
//     try {
//       const ranking = await rankingService.getWinner();
//       res.status(200).json(ranking.winners);
//     } catch (error) {
//       res.status(500).json({ error: `${error}`, error_code: "GW001" });
//     }
//   };

//   const getLoser = async (req: Request, res: Response) => {
//     try {
//       const ranking = await rankingService.getLoser();
//       res.status(200).json(ranking.losers);
//     } catch (error) {
//       res.status(500).json({ error: `${error}`, error_code: "GL001" });
//     }
//   };
//   return {
//     getRankingWithAverage,
//     getLoser,
//     getWinner,
//   };
