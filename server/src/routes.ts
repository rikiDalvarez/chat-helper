import express from "express";
import { PlayerRootControllers } from "./app";
import auth from "./infrastructure/middleware/auth";

import { createUser } from "./application/controller";
// import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/newUser", createUser);

export default router;
