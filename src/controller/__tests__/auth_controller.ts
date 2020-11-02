import request from "supertest";
import { User } from "../../entity/User";
import { createApp } from "../../app";
import userFactory from "../../tests/factory/user";
import baseContext from "../../tests/base_context";

const { app, server } = createApp();

describe("GET /login", () => {
  baseContext(server);

  it("returns login template", async () => {
    const res = await request(app).get("/login");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Login");
  });
});

describe("POST /login", () => {
  baseContext(server);
  let user: User;

  beforeEach(async () => {
    user = await userFactory.build();
    user.setPassword("super-password");
    await user.save();
  });

  describe("when auth info is correct", () => {
    it("redirects to /", async () => {
      const res = await request(app)
        .post("/login")
        .send(`email=${user.email}&password=super-password`);
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/");
    });
  });
});
