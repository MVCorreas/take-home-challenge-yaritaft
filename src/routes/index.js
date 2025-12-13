import express from "express";
import authRouter from "./authRouter";
import notificationRouter from "./notificationRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/notifications", notificationRouter);

export default router;