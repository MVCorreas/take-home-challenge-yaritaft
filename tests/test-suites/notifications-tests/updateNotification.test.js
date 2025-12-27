import request from "supertest";
import app from "../../../src/app.js";
import {
  cleanDatabase,
  createAuthenticatedUser,
  closeDatabase,
} from "../../helpers/prisma-db-setup.js";

describe("PUT /notifications/:id", () => {
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
    it("should update one notification by id", async () => {
      const res = await request(app)
        .put(`/notifications/${notification.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Hello",
          content: "This is an update of the testing notification",
          channel: "SMS",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "Notification updated successfully"
      );
    });
  });

  describe("Error response", () => {
    it("should throw ValidationError if fields are missing", async () => {
      const res = await request(app)
        .put(`/notifications/${notification.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Hello",
          content: "This is an update of the testing notification",
          channel: "",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Title, content and channel are required"
      );
    });
    it("should throw ValidationError if id is not a number", async () => {
      const res = await request(app)
        .put(`/notifications/FACKED_ID`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Hello",
          content: "This is an update of the testing notification",
          channel: "SMS",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid Notification ID");
    });
  });
});
