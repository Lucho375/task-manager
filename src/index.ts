import { AppConfig } from './config/AppConfig.js'
import { DatabaseFactory, DatabaseType, errorLogger } from './infrastructure/index.js'
import { AppExpress } from './presentation/application/AppExpress.js'
;(async () => {
  try {
    const db = DatabaseFactory.create(AppConfig.getInstance().DB_TYPE as DatabaseType)
    await db.connect(AppConfig.getInstance().DB_URI)
    const app = new AppExpress(AppConfig.getInstance().PORT)
    app.listen()
  } catch (error: any) {
    errorLogger.error(error)
  }
})()
