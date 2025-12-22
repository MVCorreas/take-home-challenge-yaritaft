import { prisma } from "../lib/prisma.js";

export const createNotificationService = {
  async createNotification(title, content, channel, userId) {
    const newNotification = await prisma.notification.create({
      data: {
        title,
        content,
        channel,
        userId,
      },
    });

    return { newNotification };
  },
};
