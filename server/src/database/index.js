import { createConnection } from "typeorm";

import { User, Counter, Queue, Service } from "../models";

const database = process.env.DB_NAME || "antr";
const host = process.env.DB_HOST || "0.0.0.0";
const port = parseInt(process.env.DB_PORT) || 3306;
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "";

async function startDatabase() {
  try {
    return await createConnection({
      type: "mariadb",
      database,
      host,
      port,
      username,
      password,
      entities: [Counter, Queue, Service, User],
      logging: ["error", "log"],
      synchronize: true,
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
    /* eslint-enable no-console */
  }
}

export default startDatabase;
