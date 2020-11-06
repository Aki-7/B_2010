import request from "supertest";
import qs from "query-string";
import { createApp } from "../../app";
import authContext from "../../tests/auth_context";
import baseContext from "../../tests/base_context";

const { app, server } = createApp();

describe("POST /donation/pay", () => {
  describe("when not logged in", () => {
    baseContext(server);
    it("redirects to /login", async () => {
      const res = await request(app)
        .post("/donation/pay")
        .send(
          qs.stringify({
            amount: 100,
          })
        );
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/login");
    });
  });

  describe("when authenticated", () => {
    authContext(app, server);
    it("redirect to /donation?message=Thank You", async () => {
      const res = await request(app)
        .post("/donation/pay")
        .send(
          qs.stringify({
            amount: 100,
          })
        );
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/");
    });
  });
});
