import cron from 'node-cron'
import { isProduction } from '../../constants/isProduction.js'
import { backupDb } from '../crons/backupDb.js'
import { cleanLogs } from '../crons/cleanLogs.js'
import { CronService } from './CronService.js'

export async function scheduleCronJobs(): Promise<Map<string, cron.ScheduledTask>> {
  const cleanLogsSchedule = isProduction ? '0 3 * * 5' : '*/10 * * * *' // At 03:00 on Friday or every 10th minute
  const backupDbSchedule = isProduction ? '0 4 * * 1' : '30 * * * *' // At 04:00 on Monday or at minute 30
  // prettier-ignore
  const cronService = new CronService(cron)
    .scheduleTask({cronExpression: cleanLogsSchedule, task : cleanLogs, taskName : "CleanLogs"})
    .scheduleTask({cronExpression: backupDbSchedule, task : backupDb , taskName: "DatabaseBackup"})

  return cronService.getScheduledTasks()
}
