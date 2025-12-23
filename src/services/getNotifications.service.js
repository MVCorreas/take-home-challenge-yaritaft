import { prisma } from "../lib/prisma.js"

export const getNotificationsService = {
    async getNotifications(userId) {
        const notifications = await prisma.notification.findMany({
            where: {
                userId
            }
        })

        return { notifications };
    }
}