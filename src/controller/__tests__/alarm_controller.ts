import request from "supertest";
import qs from "query-string";
import { createApp } from "../../app";
import { User } from "../../entity/User";
import authContext from "../../tests/auth_context";
import baseContext from "../../tests/base_context";

const { app, server } = createApp();

describe("POST /alart/update", () => {
  describe("when not authenticated", () => {
    baseContext(server);
    it("redirects to /login", async () => {
      const res = await request(app)
        .post("/alarm/update")
        .send(
          qs.stringify({
            targetWakeupTime: "08:00",
          })
        );
      expect(res.status).toBe(302);
    });
  });

  describe("when authenticated", () => {
    let user: User;
    authContext(app, server, (u) => (user = u));
    it("update current user's targetWakeupTime", async () => {
      const res = await request(app)
        .post("/alarm/update")
        .send(
          qs.stringify({
            targetWakeupTime: "08:33",
          })
        );
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/user");
      expect(user.targetWakeupTime?.getHours()).toBe(8);
      expect(user.targetWakeupTime?.getMinutes()).toBe(33);
    });
  });
});
