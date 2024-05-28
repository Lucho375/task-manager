import { errorLogger, initializeRedis, intializeDatabase, scheduleCronJobs, startHttpServer } from './infrastructure/index.js'
;(async () => {
  try {
    await intializeDatabase()
    await initializeRedis()
    await startHttpServer()
    await scheduleCronJobs()
  } catch (error: any) {
    errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
  }
})()
