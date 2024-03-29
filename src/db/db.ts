import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const poolConnection = mysql.createPool({
  host: process.env.TIDB_HOST, // TiDB host, for example: {gateway-region}.aws.tidbcloud.com
  port: 4000, // TiDB port, default: 4000
  user: process.env.TIDB_USER, // TiDB user, for example: {prefix}.root
  password: process.env.TIDB_PASSWORD, // TiDB password
  database: process.env.TIDB_DATABASE || "test", // TiDB database name, default: test
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
  connectionLimit: 1, // Setting connectionLimit to "1" in a serverless function environment optimizes resource usage, reduces costs, ensures connection stability, and enables seamless scalability.
  maxIdle: 1, // max idle connections, the default value is the same as `connectionLimit`
  enableKeepAlive: true,
});
export const db = drizzle(poolConnection);
