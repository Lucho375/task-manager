import cron from 'node-cron'
import { DB_TYPE, DB_URI, NODE_ENV, PORT } from './config/AppConfig.js'
import { ENODE_ENV } from './domain/enums/NODE_ENV.js'
import { cleanLogs, CronService, DatabaseFactory, DatabaseType, errorLogger } from './infrastructure/index.js'
import { AppExpress } from './presentation/application/AppExpress.js'
import { backupDb } from './infrastructure/crons/backupDb.js'
;(async () => {
  try {
    // Database
    const db = DatabaseFactory.create(DB_TYPE as DatabaseType)
    await db.connect(DB_URI)

    // HTTP Server
    const app = new AppExpress(PORT)
    app.listen()

    // prettier-ignore
    // Crons
    new CronService(cron)
      .scheduleTask(NODE_ENV === ENODE_ENV.Production ? '0 3 * * 5' /*At 03:00 on Friday. */ : "*/10 * * * *" /* At every 10th minute. */, cleanLogs)
      .scheduleTask(NODE_ENV === ENODE_ENV.Production ? "0 4 * * 1" /*At 04:00 on Monday. */ : "30 * * * *" , /* At minute 30. */ backupDb)
  } catch (error: any) {
    errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
  }
})()
