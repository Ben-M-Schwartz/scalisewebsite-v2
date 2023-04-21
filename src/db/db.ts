import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
//import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};
const connection = connect(config);
//for planetscale implementation
//export default connection

//for drizzle implementation
export const db = drizzle(connection /* , { logger: true } */);

//npx drizzle-kit generate:mysql --out migrations-folder --schema src/db/schema.ts
