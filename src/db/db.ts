import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
//import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

import { connect } from "@planetscale/database";

const database_config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};
const connection = connect(database_config);

export const db = drizzle(connection /* , { logger: true } */);
