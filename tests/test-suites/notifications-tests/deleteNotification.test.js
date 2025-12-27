import request from "supertest";
import app from "../../../src/app.js";
import {
  cleanDatabase,
  createAuthenticatedUser,
  closeDatabase,
} from "../../helpers/prisma-db-setup.js";

describe("DELETE /notifications/:id", () => {
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
    it("should delete one notification by id", async () => {
      const res = await request(app)
        .delete(`/notifications/${notification.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Notification deleted successfully"
      );
    });
  });

  describe("Error response", () => {
    it("should throw ValidationError if id is not a number", async () => {
      const res = await request(app)
        .delete(`/notifications/FACKED_ID`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid Notification ID");
    });
  });
});
