import { errorLogger, intializeDatabase, scheduleCronJobs, startHttpServer } from './infrastructure/index.js'
import { initializeRedis } from './infrastructure/index.js'
;(async () => {
  try {
    await intializeDatabase()
    await startHttpServer()
    await scheduleCronJobs()
    await initializeRedis()
  } catch (error: any) {
    errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
  }
})()
