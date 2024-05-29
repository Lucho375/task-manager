import { DB_TYPE, DB_URI } from '../../config/AppConfig.js'
import { DatabaseFactory, DatabaseType } from '../database/DatabaseFactory.js'

export async function intializeDatabase() {
  const db = DatabaseFactory.create(DB_TYPE as DatabaseType)
  await db.connect(DB_URI)
  return db
}
