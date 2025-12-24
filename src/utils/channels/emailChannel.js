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

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(recipientName)) {
        throw new ValidationError("Incorrect email format");
      }

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
