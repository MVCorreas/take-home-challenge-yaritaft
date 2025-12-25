import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../errors.js";
import { notificationLogger } from "../notificationLogger.js";

const MAX_SMS_LENGTH = 160; 

export const smsChannel = {
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

      // 2. Get phone number (simulated - in production, add phone field to User model)
      const phoneNumber = "+54-123456789";

      // 3. Validate phone format
      const phoneRegex = /^\+?\d{1,3}-?\d{9,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        throw new ValidationError("Invalid phone number format");
      }

      // 4. Limit content to 160 characters
      let smsContent = notification.content;
      const wasTruncated = smsContent.length > MAX_SMS_LENGTH;
      if (wasTruncated) {
        smsContent = smsContent.substring(0, MAX_SMS_LENGTH);
        console.log(`⚠️ SMS content truncated to ${MAX_SMS_LENGTH} characters`);
      }

      // 5. Send SMS (simulated - in production, use Twilio, AWS SNS, etc.)
      console.log(`📱 SMS sent to ${phoneNumber}: "${smsContent}"`);

      // 6. Log success
      await notificationLogger.logSuccess(notification.id, "SMS", {
        phoneNumber,
        messageLength: smsContent.length,
        truncated: wasTruncated,
        sentAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error("❌ SMS failed:", error.message);
      await notificationLogger.logFailure(notification.id, "SMS", error);
      throw error;
    }
  },
};
