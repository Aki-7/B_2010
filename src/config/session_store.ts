import SQLSessionStoreClassFactory from "express-mysql-session";
import * as session from "express-session";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./variables";

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

export default developmentStore();
