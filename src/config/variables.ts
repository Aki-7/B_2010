const getENV = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) throw `Env variable ${key} is not set`;
  return value;
};

export const ENV = getENV("NODE_ENV", "development") as
  | "development"
  | "production"
  | "test";

if (!["development", "production", "test"].includes(ENV))
  throw `Undefined NODE_ENV ${ENV}`;

export const SECRET = getENV("SECRET");

export const PORT = Number(getENV("PORT", "3000"));

export const DB_HOST = getENV("DB_HOST", "localhost");

export const DB_PORT = Number(getENV("DB_PORT", "3306"));

export const DB_USER = getENV("DB_USER", "root");

export const DB_NAME = getENV("DB_NAME");

export const DB_PASS = getENV("DB_PASS", "");
