import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../errors.js";
import { mailgunService } from "../../lib/mailgun.js";
import { notificationLogger } from "../notificationLogger.js";

export const emailChannel = {
  async send(notification) {
    try {
      // 1. Fetch user
      const user = await prisma.user.findUnique({
        where: { id: notification.userId },
        select: { email: true },
      });

      if (!user) {
        throw new ValidationError(`User not found for notification ${notification.id}`);
      }

      // 2. Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(user.email)) {
        throw new ValidationError("Invalid email format");
      }

      // 3. Generate email template
      const emailTemplate = {
        to: `${user.email} <${user.email}>`,
        subject: notification.title,
        body: notification.content,
      };

      // 4. Send email
      const result = await mailgunService.sendEmail(
        emailTemplate.to,
        emailTemplate.subject,
        emailTemplate.body
      );

      console.log(`✅ Email sent to ${user.email}`);

      // 5. Log success
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
