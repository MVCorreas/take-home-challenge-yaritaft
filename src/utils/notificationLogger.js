import { prisma } from "../lib/prisma.js";

export const notificationLogger = {
  async logSuccess(notificationId, channel, metadata = {}) {
    await Promise.all([
      prisma.notification.update({
        where: { id: notificationId },
        data: { status: "SENT" },
      }),
      prisma.notificationLog.create({
        data: {
          notificationId,
          channel,
          status: "success",
          metadata: {
            ...metadata,
            sentAt: new Date().toISOString(),
          },
        },
      }),
    ]);
  },

  async logFailure(notificationId, channel, error) {
    await Promise.all([
      prisma.notification.update({
        where: { id: notificationId },
        data: { status: "FAILED" },
      }),
      prisma.notificationLog.create({
        data: {
          notificationId,
          channel,
          status: "failed",
          metadata: {
            error: error.message,
            failedAt: new Date().toISOString(),
          },
        },
      }),
    ]);
  },
};
