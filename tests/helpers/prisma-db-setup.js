import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const createAuthenticatedUser = async (
  email = "test@example.com",
  password = "123456"
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const notification = await prisma.notification.create({
    data: {
      title: "Testing Notification",
      content: "This is a test notification",
      channel: "EMAIL",
      userId: user.id,
    },
  });

  return { user, token, notification };
};

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
