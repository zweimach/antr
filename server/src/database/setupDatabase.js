import { createConnection } from "typeorm";

import * as models from "../models";

const defaultConfig = {
  type: process.env.DB_TYPE || "mariadb",
  database: process.env.DB_NAME || "antr",
  host: process.env.DB_HOST || "0.0.0.0",
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  entities: Object.values(models),
  logging: ["error", "log"],
  synchronize: process.env.DB_SYNC || true,
};

export default async function setupDatabase(config, useDefault = true) {
  if (!useDefault) {
    return await createConnection(config);
  }
  return await createConnection({ ...defaultConfig, ...config });
}
