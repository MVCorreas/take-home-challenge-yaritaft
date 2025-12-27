import request from "supertest";
import app from "../../../src/app.js";
import {
  cleanDatabase,
  createAuthenticatedUser,
  prisma,
} from "../../helpers/prisma-db-setup.js";
import { setTimeout } from "timers/promises";

const waitForAsync = (ms = 200) => setTimeout(ms);

describe("POST /notifications", () => {
  let token;

  beforeEach(async () => {
    await cleanDatabase();
    ({ token } = await createAuthenticatedUser());
  });

  afterEach(async () => {
    await waitForAsync();
  });

  describe("Successful response", () => {
    it("should create notification and log success", async () => {
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Hello",
          content: "This is a test",
          channel: "EMAIL",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "Notification created successfully"
      );

      await waitForAsync();

      const logs = await prisma.notificationLog.findMany({
        where: { notificationId: res.body.newNotification.id },
      });
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].status).toBe("success");
    });
  });

  describe("Error response", () => {
    it("should throw ValidationError if fields are missing", async () => {
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Hello",
          content: "",
          channel: "",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Title, content and channel are required"
      );
    });
  });
});
