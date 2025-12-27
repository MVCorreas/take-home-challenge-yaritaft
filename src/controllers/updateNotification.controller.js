import { ValidationError } from "../utils/errors.js";
import { updateNotificationService } from "../services/updateNotification.service.js";

export const updateNotification = async (req, res, next) => {
  try {
    const { title, content, channel } = req.body;
    const userId = req.userId;
    const id = parseInt(req.params.id);

    if (!title || !content || !channel) {
      throw new ValidationError("Title, content and channel are required");
    }

    if (isNaN(id)) {
      throw new ValidationError("Invalid Notification ID");
    }

    const { updatedNotification } =
      await updateNotificationService.updateNotification(
        id,
        userId,
        title,
        content,
        channel
      );

    res.status(200).json({
      message: "Notification updated successfully",
      updatedNotification,
    });
  } catch (error) {
    next(error);
  }
};
