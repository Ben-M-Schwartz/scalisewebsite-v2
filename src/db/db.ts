import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

import { connect } from '@planetscale/database'

const config = {
    url: process.env.DATABASE_URL || 'mysql://user:pass@host'
}
  
async function connectToDatabase() {
    const dbconnection = await connect(config)
    return dbconnection
}

const connection = await connectToDatabase()
//for planetscale implementation
//export default connection

//for drizzle implementation
export const db = drizzle(connection, { logger: true });

await migrate(db, { migrationsFolder: './drizzle' });