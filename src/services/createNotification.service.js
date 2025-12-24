import { prisma } from "../lib/prisma.js";
import { getChannel } from "../utils/channels/channelFactory.js";

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

    const channelHandler = getChannel(channel);
    channelHandler.send(newNotification).catch((error) => {
      console.error("Channel send failed:", error);
    });

    return newNotification;
  },
};
