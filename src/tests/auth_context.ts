import { Express } from "express";
import { Server } from "http";
import { createConnection, getConnection } from "typeorm";
import userFactory from "./factory/user";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const passportStub = require("passport-stub");

const authContext = (app: Express, server: Server) => {
  beforeEach(async () => {
    await createConnection();
    const user = await userFactory.create();
    passportStub.install(app);
    passportStub.login(user);
  });
  afterEach(async () => {
    passportStub.logout();
    passportStub.uninstall(app);
    server.close();
    await getConnection().close();
  });
};

export default authContext;
