/**
 * @route GET /pets
 * @description Obtiene una lista de mascotas
 * @response 200 - Lista de mascotas
 */

import { getNotificationsService } from "../services/getNotifications.service.js";

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.userId;

    const { notifications } = await getNotificationsService.getNotifications(
      userId
    );

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    next(error);
  }
};
