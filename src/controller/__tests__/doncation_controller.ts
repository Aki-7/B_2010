import request from "supertest";
import qs from "query-string";
import { createApp } from "../../app";
import authContext from "../../tests/auth_context";
import baseContext from "../../tests/base_context";
import { User } from "../../entity/User";

const { app, server } = createApp();

describe("GET /donation", () => {
  describe("when not logged in", () => {
    baseContext(server);
    it("redirects to /login", async () => {
      const res = await request(app).get("/donation");
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/login");
    });
  });

  describe("when authenticated", () => {
    authContext(app, server);
    it("returns donation template", async () => {
      const res = await request(app).get("/donation");
      expect(res.status).toBe(200);
      expect(res.text).toContain("Donation");
    });
  });
});

describe("POST /donation", () => {
  describe("when not logged in", () => {
    baseContext(server);
    it("redirects to /login", async () => {
      const res = await request(app).get("/donation");
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/login");
    });
  });

  describe("when authenticated", () => {
    let user: User;
    authContext(app, server, (u) => (user = u));

    describe("with valid params", () => {
      it("update current user's fine", async () => {
        expect(user.fine).toBe(0);
        const res = await request(app)
          .post("/donation")
          .send(qs.stringify({ amount: 200 }));
        expect(res.status).toBe(302);
        expect(res.headers["location"]).toBe("/");
        expect(user.fine).toBe(200);
      });
    });

    describe("with invalid params", () => {
      it("returns 400", async () => {
        let res = await request(app).post("/donation").send(qs.stringify({}));
        expect(res.status).toBe(400);
        res = await request(app)
          .post("/donation")
          .send(qs.stringify({ amount: -3 }));
        expect(res.status).toBe(400);
        res = await request(app)
          .post("/donation")
          .send(qs.stringify({ amount: 10000 }));
        expect(res.status).toBe(400);
        res = await request(app)
          .post("/donation")
          .send(qs.stringify({ amount: "invalid" }));
        expect(res.status).toBe(400);
      });
    });
  });
});
