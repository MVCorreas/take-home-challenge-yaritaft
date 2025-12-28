import { prisma } from "../lib/prisma.js";
import { NotificationStatus } from "../generated/prisma/index.d.ts";

export const notificationLogger = {
  async log(notificationId, channel, isSuccess, metadata = {}) {
    const status = isSuccess
      ? NotificationStatus.SENT
      : NotificationStatus.FAILED;
    const logStatus = isSuccess ? "success" : "failed";

    await Promise.all([
      prisma.notification.update({
        where: { id: notificationId },
        data: { status },
      }),
      prisma.notificationLog.create({
        data: {
          notificationId,
          channel,
          status: logStatus,
          metadata: {
            ...metadata,
            [isSuccess ? "sentAt" : "failedAt"]: new Date().toISOString(),
          },
        },
      }),
    ]);
  },

  logSuccess(notificationId, channel, metadata) {
    return this.log(notificationId, channel, true, metadata);
  },

  logFailure(notificationId, channel, error) {
    return this.log(notificationId, channel, false, { error: error.message });
  },
};
