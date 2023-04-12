require('dotenv').config()

import { connect } from '@planetscale/database'

const config = {
  url: process.env.DATABASE_URL || 'mysql://user:pass@host'
}

async function connectToDatabase() {
  const dbconnection = await connect(config)
  return dbconnection
}

const connection = await connectToDatabase()

export default connection
 
