import express from "express";
import { PlayerRootControllers } from "./app";
import auth from "./infrastructure/middleware/auth";

import {
  createUser,
  loginHandle,
  createRoom,
  getUserList,
} from "./application/controller";
// import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/newUser", createUser);
router.post("/user", loginHandle);
router.put("/newRoom", auth, createRoom);
router.get("/users", auth, getUserList);

export default router;
