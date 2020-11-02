const dotenv = require("dotenv");
const { env } = require("process");
dotenv.config();

const development = {
  type: "mysql",
  host: process.env["DB_HOST"] || "localhost",
  port: process.env["DB_PORT"] || 3306,
  username: process.env["DB_USER"] || "root",
  password: process.env["DB_PASS"],
  database: process.env["DB_NAME"],
  logging: ["query"],
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migration/*.js"],
  subscribers: ["dist/subscriber/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const test = {
  type: "mysql",
  host: process.env["DB_HOST"] || "localhost",
  port: process.env["DB_PORT"] || 3306,
  username: process.env["DB_USER"] || "root",
  password: process.env["DB_PASS"],
  database: process.env["DB_NAME_TEST"],
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  synchronize: true,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

module.exports = ((env) => {
  switch (env) {
    case "development":
      return development;

    case "test":
      return test;

    default:
      return development;
  }
})(env["NODE_ENV"]);
