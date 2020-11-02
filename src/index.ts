import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import multer from "multer";
import { createConnection } from "typeorm";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bodyParser from "body-parser";
import { PORT, SECRET } from "./config/variables";
import sessionStore from "./config/session_store";
import { parameter } from "./lib/parameter";
import { User } from "./entity/User";
import auth from "./middleware/auth";
import getCurrentUser from "./lib/get_current_user";
import errorHandler from "./middleware/error_handler";

const upload = multer();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "template"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: User, done) => done(null, user.id));
passport.deserializeUser(async (id: number, done) => {
  const user = await User.findOne(id);
  if (!user) return done(null, null);
  return done(null, user);
});
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, null);
        if (!user.validatePassword(password)) return done(null, null);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", upload.none(), (req, res) => {
  const { password, ...params } = parameter(req).fields({
    username: true,
    email: true,
    password: true,
  });

  const user = User.create(params);
  user.setPassword(password);
  user.save();

  res.redirect("/signup");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/", auth, (req, res) => {
  const user = getCurrentUser(req);
  res.render("index", { user });
});

app.use(errorHandler);

createConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`[*] Server listening on port ${PORT}`));
  })
  .catch((err) => console.error(err));
