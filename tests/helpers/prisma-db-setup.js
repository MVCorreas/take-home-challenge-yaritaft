import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
import pg from "pg";

const { PrismaClient } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5434/notifications_db_test";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


export const cleanDatabase = async () => {
  await prisma.notificationLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.user.deleteMany({});
};

export const closeDatabase = async () => {
  await prisma.$disconnect();
  await pool.end();
};

export { prisma };

// Global teardown function for Jest
export default async function globalTeardown() {
  await closeDatabase();
}
