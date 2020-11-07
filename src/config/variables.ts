import dotenv from "dotenv";
dotenv.config();

type ENV = "development" | "production" | "test";

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

const switchEnv = (envs: {
  prod: () => string;
  dev: () => string;
  test: () => string;
}) => {
  switch (ENV) {
    case "development":
      return envs.dev();

    case "production":
      return envs.prod();

    case "test":
      return envs.test();
  }
};

export const SECRET = getENV("SECRET");

export const STRIPE_API_KEY = switchEnv({
  prod: () => getENV("STRIPE_API_KEY"),
  dev: () => getENV("STRIPE_API_KEY"),
  test: () => "sk_test_AAA",
});

export const STRIPE_PUB_KEY = switchEnv({
  prod: () => getENV("STRIPE_PUB_KEY"),
  dev: () => getENV("STRIPE_PUB_KEY"),
  test: () => "pk_test_AAA",
});

export const PORT = Number(getENV("PORT", "3000"));

export const DB_HOST = getENV("DB_HOST", "localhost");

export const DB_PORT = Number(getENV("DB_PORT", "3306"));

export const DB_USER = getENV("DB_USER", "root");

export const DB_NAME = getENV("DB_NAME");

export const DB_PASS = getENV("DB_PASS", "");

export const CLOUD_VISION_API_KEY = getENV("CLOUD_VISION_API_KEY", "");
