import express from "express";
import { PlayerRootControllers } from "./app";
import auth from "./infrastructure/middleware/auth";

import { createUser, loginHandle, createRoom } from "./application/controller";
// import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/newUser", createUser);
router.post("/user", loginHandle);
router.put("/newRoom", createRoom )

export default router;
