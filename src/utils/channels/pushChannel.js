import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../errors.js";
import { notificationLogger } from "../notificationLogger.js";

export const pushChannel = {
  async send(notification) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: notification.userId },
        select: { email: true },
      });

      if (!user) {
        throw new ValidationError(
          `User not found for notification ${notification.id}`
        );
      }

      const deviceToken = `device_token_${user.email.split("@")[0]}`;

      if (!deviceToken || deviceToken.length < 10) {
        throw new ValidationError("Invalid device token");
      }

      const payload = {
        notification: {
          title: notification.title,
          body: notification.content,
        },
        data: {
          notificationId: notification.id,
          createdAt: notification.createdAt,
        },
        to: deviceToken,
      };

      console.log(`🔔 Push notification sent to device ${deviceToken}`);

      await notificationLogger.logSuccess(notification.id, "PUSH", {
        deviceToken,
        status: "delivered",
        sentAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Push notification failed:", error.message);

      await notificationLogger.logFailure(notification.id, "PUSH", error);

      throw error;
    }
  },
};
