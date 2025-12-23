import { prisma } from "../lib/prisma.js";

export const deleteNotificationService = {
  async deleteNotification(id, userId) {
    const deletedNotification = await prisma.notification.delete({
      where: {
        id,
        userId
      },
    });

    return { deletedNotification };
  },
};
