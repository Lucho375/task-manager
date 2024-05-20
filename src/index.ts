import { AppExpress } from './presentation/application/AppExpress.js'
import { MongooseDatabase } from './infrastructure/database/mongodb/MongooseDatabase.js'
import { appConfig } from './config/AppConfig.js'
;(async () => {
  try {
    await MongooseDatabase.connect(appConfig.DATABASE_URI)
    const app = new AppExpress(appConfig.PORT)
    app.listen()
  } catch (error) {}
})()
