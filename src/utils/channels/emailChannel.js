import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../errors.js";
import { mailgunService } from "../../lib/mailgun.js";
import { notificationLogger } from "../notificationLogger.js";

export const emailChannel = {
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

      const recipientName = user.email;
      const result = await mailgunService.sendEmail(
        `${recipientName} <${user.email}>`,
        notification.title,
        notification.content
      );

      console.log(`✅ Email sent to ${user.email}`);

      await notificationLogger.logSuccess(notification.id, "EMAIL", {
        recipient: user.email,
        messageId: result.id,
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Email failed:", error.message);

      await notificationLogger.logFailure(notification.id, "EMAIL", error);

      throw error;
    }
  },
};
