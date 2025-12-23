import { prisma } from "../lib/prisma.js";

export const updateNotificationService = {
  async updateNotification(id, userId, title, content, channel) {
    const updatedNotification = await prisma.notification.update({
      where: {
        id,
        userId,
      },
      data: {
        title,
        content,
        channel,
      },
    });

    return { updatedNotification };
  },
};
