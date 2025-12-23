import express from "express";
import { createNotification } from "../controllers/createNotification.controller.js";
import { updateNotification } from "../controllers/updateNotification.controller.js";
import { deleteNotification } from "../controllers/deleteNotification.controller.js";

const router = express.Router();

router.post("/", createNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);
// router.get("/", getNotifications)

export default router;