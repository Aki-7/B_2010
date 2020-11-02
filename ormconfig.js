const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  type: "mysql",
  host: process.env["DB_HOST"],
  port: process.env["DB_PORT"],
  username: "root",
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
