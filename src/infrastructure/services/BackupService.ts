import { exec } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { promisify } from 'util'
import { BACKUP_DIR } from '../../config/AppConfig.js'
import { errorLogger } from '../logger/errorLogger.js'
import { infoLogger } from '../logger/infoLogger.js'

const execPromise = promisify(exec)

export class BackupService {
  static async backupMongoDB(uri: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = path.join(BACKUP_DIR, `mongodb-backup-${timestamp}`)
      await fs.mkdir(backupPath, { recursive: true })

      const command = `mongodump --uri="${uri}" --out="${backupPath}"`
      await execPromise(command)
      infoLogger.info(`MongoDB backup completed: ${backupPath}`)
    } catch (error: any) {
      errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
    }
  }

  static async backupMySQL(dbUri: string): Promise<void> {
    try {
      const url = new URL(dbUri)
      const host = url.hostname
      const user = url.username
      const password = url.password
      const database = url.pathname.slice(1)

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupFile = path.join(BACKUP_DIR, `mysql-backup-${timestamp}.sql`)
      await fs.mkdir(BACKUP_DIR, { recursive: true })

      const command = `mysqldump --host=${host} --user=${user} --password=${password} ${database} > ${backupFile}`
      await execPromise(command)
      infoLogger.info(`MySQL backup completed: ${backupFile}`)
    } catch (error: any) {
      errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
    }
  }
}
