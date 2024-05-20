import { AppExpress } from './presentation/application/AppExpress.js'
import { MongooseDatabase } from './config/database.js'
;(async () => {
  try {
    await MongooseDatabase.connect('mongodb://127.0.0.1:27017/tasks')
    const app = new AppExpress(8080)
    app.listen()
  } catch (error) {}
})()
