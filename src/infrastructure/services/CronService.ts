import cron from 'node-cron'
import { z } from 'zod'

const schema = z.string().refine((value) => {
  return cron.validate(value)
})

interface IScheduleTask {
  cronExpression: string
  task: (now: Date | 'manual' | 'init') => void
  taskName?: string
}

export class CronService {
  private cron: typeof cron
  private cronExpressionSchema: z.ZodSchema<string>

  constructor(cronLib: typeof cron) {
    this.cron = cronLib
    this.cronExpressionSchema = schema
  }

  public scheduleTask = ({ cronExpression, task, taskName }: IScheduleTask): this => {
    if (!this.isValidCronExpression(cronExpression)) {
      throw new Error(`Invalid cron expression : ${cronExpression}`)
    }
    this.cron.schedule(cronExpression, task, { name: taskName })
    return this
  }

  public getScheduledTasks = (): Map<string, cron.ScheduledTask> => {
    return this.cron.getTasks()
  }

  private isValidCronExpression = (expression: string): boolean => {
    try {
      this.cronExpressionSchema.parse(expression)
      return true
    } catch (error: any) {
      if (error instanceof Error && error.name === 'ZodError') {
        return false
      }
      throw error
    }
  }
}
