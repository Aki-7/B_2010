import factory from "factory-girl";
import { User } from "../../entity/User";
import ApplicationFactory from "./base/application_factory";

const userFactory = new ApplicationFactory<User>("User").define(User, {
  username: factory.seq("User.username", (n) => `user-${n}`),
  email: factory.seq("User.email", (n) => `user-${n}@user.com`),
});

export default userFactory;
