import cron from 'node-cron'
import { NODE_ENV } from '../../config/AppConfig.js'
import { ENODE_ENV } from '../../domain/enums/NODE_ENV.js'
import { backupDb } from '../crons/backupDb.js'
import { cleanLogs } from '../crons/cleanLogs.js'
import { CronService } from './CronService.js'

export async function scheduleCronJobs() {
  // prettier-ignore
  new CronService(cron)
  .scheduleTask(NODE_ENV === ENODE_ENV.Production ? '0 3 * * 5' /*At 03:00 on Friday. */ : "*/10 * * * *" /* At every 10th minute. */, cleanLogs)
  .scheduleTask(NODE_ENV === ENODE_ENV.Production ? "0 4 * * 1" /*At 04:00 on Monday. */ : "30 * * * *" , /* At minute 30. */ backupDb)
}
