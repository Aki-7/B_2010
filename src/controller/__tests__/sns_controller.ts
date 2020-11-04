import request from "supertest";
import { createApp } from "../../app";
import authContext from "../../tests/auth_context";
import baseContext from "../../tests/base_context";

const { app, server } = createApp();

describe("GET /sns", () => {
  describe("when not login", () => {
    baseContext(server);
    it("redirects to /login", async () => {
      const res = await request(app).get("/sns");
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/login");
    });
  });

  describe("when authenticated", () => {
    authContext(app, server);
    it("returns sns template", async () => {
      const res = await request(app).get("/sns");
      expect(res.status).toBe(200);
      expect(res.text).toContain("SNS");
    });
  });
});
