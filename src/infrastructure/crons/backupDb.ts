import { DB_TYPE, DB_URI } from '../../config/AppConfig.js'
import { DatabaseType } from '../database/DatabaseFactory.js'
import { BackupService } from '../services/BackupService.js'

export function backupDb(): Promise<void> {
  if (DB_TYPE === DatabaseType.MONGO) {
    return BackupService.backupMongoDB(DB_URI)
  }

  if (DB_TYPE === DatabaseType.MYSQL) {
    return BackupService.backupMySQL(DB_URI)
  }

  return Promise.reject(new Error(`Unsupported database type: ${DB_TYPE}`))
}
