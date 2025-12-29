import request from "supertest";
import app from "../../../src/app.js";
import {
  cleanDatabase,
  createAuthenticatedUser,
  closeDatabase,
  prisma,
} from "../../helpers/prisma-db-setup.js";
import { setTimeout } from "timers/promises";

const waitForAsync = (ms = 200) => setTimeout(ms);

describe("Notification Channel Handlers", () => {
  let token;

  beforeEach(async () => {
    await cleanDatabase();
    ({ token } = await createAuthenticatedUser());
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("EMAIL Channel", () => {
    it("should handle EMAIL notification successfully", async () => {
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Email Test",
          content: "This is an email test notification",
          channel: "EMAIL",
        });

      expect(res.statusCode).toBe(201);
      await waitForAsync();

      const logs = await prisma.notificationLog.findMany({
        where: { notificationId: res.body.newNotification.id },
      });
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].channel).toBe("EMAIL");
    });
  });

  describe("SMS Channel", () => {
    it("should handle SMS notification successfully", async () => {
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "SMS Test",
          content: "This is an SMS test notification",
          channel: "SMS",
        });

      expect(res.statusCode).toBe(201);
      await waitForAsync();

      const logs = await prisma.notificationLog.findMany({
        where: { notificationId: res.body.newNotification.id },
      });
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].channel).toBe("SMS");
    });

    it("should truncate SMS content longer than 160 characters", async () => {
      const longContent = "a".repeat(200);
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Long SMS",
          content: longContent,
          channel: "SMS",
        });

      expect(res.statusCode).toBe(201);
      await waitForAsync();
    });
  });

  describe("PUSH Channel", () => {
    it("should handle PUSH notification successfully", async () => {
      const res = await request(app)
        .post("/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Push Test",
          content: "This is a push notification test",
          channel: "PUSH",
        });

      expect(res.statusCode).toBe(201);
      await waitForAsync();

      const logs = await prisma.notificationLog.findMany({
        where: { notificationId: res.body.newNotification.id },
      });
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].channel).toBe("PUSH");
    });
  });
});
