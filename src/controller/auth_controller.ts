import { Express } from "express";
import passport from "passport";
import { User } from "../entity/User";
import { parameter } from "../lib/parameter";
import R from "./base/application_router";

const authRouting = (app: Express) => {
  app.get("/login", login);
  app.post("/login", authenticate);
  app.get("/signup", signup);
  app.post("/signup", newUser);
  app.get("/logout", logout);
};

const login = R((req, res) => {
  res.render("login");
});

const authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

const signup = R((req, res) => {
  res.render("signup");
});

const newUser = R(async (req, res) => {
  const { password, ...params } = parameter(req).fields({
    username: true,
    email: true,
    password: true,
  });

  const user = User.create({ ...params, fine: 0 });
  user.setPassword(password);
  await user.valid();
  await user.associateStripe();
  await user.save();

  res.redirect("/login");
});

const logout = R((req, res) => {
  req.logout();
  res.redirect("/login");
});

export default authRouting;
