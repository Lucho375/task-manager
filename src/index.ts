import cron from 'node-cron'
import { AppConfig } from './config/AppConfig.js'
import { cleanLogs, CronService, DatabaseFactory, DatabaseType, errorLogger } from './infrastructure/index.js'
import { AppExpress } from './presentation/application/AppExpress.js'
;(async () => {
  try {
    // Database
    const db = DatabaseFactory.create(AppConfig.getInstance().DB_TYPE as DatabaseType)
    await db.connect(AppConfig.getInstance().DB_URI)

    // HTTP Server
    const app = new AppExpress(AppConfig.getInstance().PORT)
    app.listen()

    // Crons
    // prettier-ignore
    new CronService(cron)
      .scheduleTask('0 3 * * 5' /*At 03:00 on Friday. */, cleanLogs)
  } catch (error: any) {
    errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
  }
})()
