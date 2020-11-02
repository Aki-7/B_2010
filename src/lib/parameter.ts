import { Request } from "express";
import { HttpError } from "./errors";

export const parameter = (req: Request) => {
  return {
    fields: <T extends Record<string, boolean>>(fields: T) => {
      return Object.keys(fields).reduce((prev, key) => {
        const value = req.body[key];
        if (fields[key] === true && value === undefined)
          throw new HttpError(400, `${key} is required.`);
        prev[key as keyof T] = value;
        return prev;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as { [key in keyof T]: any });
    },
  };
};
