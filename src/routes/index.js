import express from "express";
import authRouter from "./authRouter.js";
import notificationRouter from "./notificationRouter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/notifications", authMiddleware, notificationRouter);

export default router;