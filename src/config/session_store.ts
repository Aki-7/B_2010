import SQLSessionStoreClassFactory from "express-mysql-session";
import * as session from "express-session";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, ENV } from "./variables";

const developmentStore = () => {
  const SessionStore = SQLSessionStoreClassFactory(session);
  return new SessionStore({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });
};

// use default memory store
const testStore = () => undefined;

export default ((env) => {
  switch (env) {
    case "development":
      return developmentStore();
    case "test":
      return testStore();
    case "production":
      // FIXME:
      throw "not implemented";
  }
})(ENV);
