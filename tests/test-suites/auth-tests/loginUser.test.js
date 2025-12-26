import request from "supertest";
import app from "../../../src/app.js";
import { cleanDatabase, closeDatabase } from "../../helpers/prisma-db-setup.js";
import { prisma } from "../../helpers/prisma-db-setup.js";
import bcrypt from "bcryptjs";

describe("POST /auth/login", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });
  describe("Successful response", () => {
    it("should log a user and return success response", async () => {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await prisma.user.create({
        data: {
          email: "test@example.com",
          password: hashedPassword,
        },
      });

      const res = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login successful");
      expect(res.body).toHaveProperty("token");
    });
  });
  describe("Error response", () => {
    it("should throw ValidationError if fields are missing", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Email and password are required"
      );
    });
  });
});
