import request from "supertest";
import qs from "query-string";
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
        .send(
          qs.stringify({
            email: user.email,
            password: "super-password",
          })
        );
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toBe("/");
    });
  });
});

describe("GET /signup", () => {
  baseContext(server);

  it("returns signup template", async () => {
    const res = await request(app).get("/signup");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Signup");
  });
});

describe("POST /signup", () => {
  baseContext(server);

  it("creates User", async () => {
    const res = await request(app)
      .post("/signup")
      .send(
        qs.stringify({
          email: "test@user.com",
          password: "this-is-pass",
          username: "test",
        })
      );
    expect(res.status).toBe(302);
    expect(res.headers["location"]).toBe("/");
    const user = await User.findOne({ email: "test@user.com" });
    expect(user).not.toBe(undefined);
    if (user) await user.remove();
  });

  describe("with invalid args", () => {
    it("returns 400", async () => {
      const res = await request(app)
        .post("/signup")
        .send(
          qs.stringify({
            email: "test_at_user.com",
            password: "this-is-pass",
            username: "test",
          })
        );
      expect(res.status).toBe(400);
    });
  });
});
