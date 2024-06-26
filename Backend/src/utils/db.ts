/*
  CONNECT TO DB: EXECUTE QUERIES
*/
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, ENDPOINT_ID, ENV } from "../utils/config";

const pg = ENV === "PROD" ? postgres({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
})
  : postgres({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  });

export const db = drizzle(pg);