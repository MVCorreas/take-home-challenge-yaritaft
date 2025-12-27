import request from "supertest";
import app from "../../../src/app.js";
import { cleanDatabase, closeDatabase } from "../../helpers/prisma-db-setup.js";

describe("POST /auth/register", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });
  describe("Successful response", () => {
    it("should register a new user and return success response", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "yamila@mail.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "User registered correctly");
      expect(res.body.user).toHaveProperty("email", "yamila@mail.com");
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
        "Email and password are required",
      );
    });
  });
});
