import express from "express";
import { createNotification } from "../controllers/createNotification.controller.js";
import { updateNotification } from "../controllers/updateNotification.controller.js";
import { deleteNotification } from "../controllers/deleteNotification.controller.js";
import { getNotifications } from "../controllers/getNotifications.controller.js";

const router = express.Router();

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     description: Create a notification and send it through the specified channel (EMAIL, SMS, or PUSH)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - channel
 *             properties:
 *               title:
 *                 type: string
 *                 example: Notification Title
 *               content:
 *                 type: string
 *                 example: Notification content message
 *               channel:
 *                 type: string
 *                 enum: [EMAIL, SMS, PUSH]
 *                 example: EMAIL
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification created successfully
 *                 newNotification:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Notification Title
 *                     content:
 *                       type: string
 *                       example: Notification content message
 *                     channel:
 *                       type: string
 *                       example: EMAIL
 *                     status:
 *                       type: string
 *                       example: PENDING
 *                     userId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Title, content and channel are required
 *       401:
 *         description: Unauthorized - Token required
 */
router.post("/", createNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update an existing notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Notification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - channel
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               content:
 *                 type: string
 *                 example: Updated content
 *               channel:
 *                 type: string
 *                 enum: [EMAIL, SMS, PUSH]
 *                 example: SMS
 *     responses:
 *       201:
 *         description: Notification updated successfully
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", updateNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       400:
 *         description: Invalid Notification ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 */
router.delete("/:id", deleteNotification);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications for authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Notification 1
 *                       content:
 *                         type: string
 *                         example: Content 1
 *                       channel:
 *                         type: string
 *                         example: EMAIL
 *                       status:
 *                         type: string
 *                         example: SENT
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-25T00:00:00.000Z
 *       401:
 *         description: Unauthorized
 */
router.get("/", getNotifications);

export default router;
