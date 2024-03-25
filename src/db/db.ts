/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { drizzle } from "drizzle-orm/planetscale-serverless";
//import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

import "dotenv/config";
export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

// import { connect } from "@planetscale/database";

// const database_config = {
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// };
// const connection = connect(database_config);
// export const db = drizzle(connection /* , { logger: true } */);

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client);
