import { deleteNotificationService } from "../services/deleteNotification.service.js";
import { ValidationError } from "../utils/errors.js";

export const deleteNotification = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;

    if (isNaN(id)) {
      throw new ValidationError("Invalid Notification ID");
    }

    const { deletedNotification } =
      await deleteNotificationService.deleteNotification(id, userId);

    res.status(200).json({
      message: "Notification deleted successfully",
      deletedNotification,
    });
  } catch (error) {
    next(error);
  }
};
