import express from "express";
import { PlayerRootControllers } from "./app";
import auth from "./infrastructure/middleware/auth";

import {
  createUser,
  loginHandle,
  createRoom,
  getUserList,
  getRoomList,
} from "./application/controller";
import { googleOauthHandler } from "./session.controller";
// import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/newUser", createUser);
router.post("/user", loginHandle);
router.put("/newRoom", auth, createRoom);
router.get("/users", auth, getUserList);
router.get("/rooms", auth, getRoomList);
router.get("/sessions/oauth/google", googleOauthHandler )

export default router;
