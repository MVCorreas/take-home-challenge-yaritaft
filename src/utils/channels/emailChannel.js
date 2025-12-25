import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../errors.js";
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

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(user.email)) {
        throw new ValidationError("Invalid email format");
      }

      const emailTemplate = {
        to: user.email,
        subject: notification.title,
        body: notification.content,
      };

      console.log(`✉️ Email sent to ${emailTemplate.to}`);

      await notificationLogger.logSuccess(notification.id, "EMAIL", {
        recipient: user.email,
        template: emailTemplate,
        sentAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Email failed:", error.message);
      await notificationLogger.logFailure(notification.id, "EMAIL", error);
      throw error;
    }
  },
};
