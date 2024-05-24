import { appConfig } from './config/AppConfig.js'
import { DatabaseFactory, DatabaseType } from './infrastructure/index.js'
import { AppExpress } from './presentation/application/AppExpress.js'
;(async () => {
  try {
    const db = DatabaseFactory.create(appConfig.DB_TYPE as DatabaseType)
    await db.connect(appConfig.DATABASE_URI)
    const app = new AppExpress(appConfig.PORT)
    app.listen()
  } catch (error) {
    console.log(error)
  }
})()
