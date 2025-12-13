import express from "express";
import authRouter from "./authRouter";
import notificationRouter from "./notificationRouter";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/notifications", authMiddleware, notificationRouter);

export default router;