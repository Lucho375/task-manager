import { errorLogger, initializeRedis, intializeDatabase, scheduleCronJobs, startHttpServer } from './infrastructure/index.js'
;(async () => {
  try {
    const db = await intializeDatabase()
    const redisClient = await initializeRedis()
    const httpServer = startHttpServer()
    const scheduledTasks = await scheduleCronJobs()
  } catch (error: any) {
    errorLogger.error({ message: error?.message, stack: error?.stack, name: error?.name })
  }
})()
