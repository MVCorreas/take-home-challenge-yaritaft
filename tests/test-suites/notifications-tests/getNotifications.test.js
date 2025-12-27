import request from "supertest";
import app from "../../../src/app.js";
import {
  cleanDatabase,
  createAuthenticatedUser,
  closeDatabase,
} from "../../helpers/prisma-db-setup.js";

describe("GET /notifications", () => {
  let token;
  let notification;

  beforeEach(async () => {
    await cleanDatabase();
    ({ token, notification } = await createAuthenticatedUser());
  });
  afterAll(async () => {
    await closeDatabase();
  });

  describe("Successful response", () => {
    it("should get all notifications by user", async () => {
      const res = await request(app)
        .get("/notifications")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("notifications");
    });
  });
});
