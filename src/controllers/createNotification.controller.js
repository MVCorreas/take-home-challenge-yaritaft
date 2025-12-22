import { createNotificationService } from "../services/createNotification.service.js";
import { ValidationError } from "../utils/errors.js";

export const createNotification = async (req, res, next) => {
  try {
    const { title, content, channel } = req.body;
    const userId = req.userId;

    if (!title || !content || !channel) {
      throw new ValidationError("Title, content and channel are required");
    }

    const { newNotification } =
      await createNotificationService.createNotification(
        title,
        content,
        channel,
        userId
      );

    res.status(201).json({
      message: "Notification created successfully",
      newNotification,
    });
  } catch (error) {
    next(error);
  }
};
