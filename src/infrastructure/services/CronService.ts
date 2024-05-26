import cron from 'node-cron'
import { z } from 'zod'

const schema = z.string().refine((value) => {
  return cron.validate(value)
})

export class CronService {
  private cron: typeof cron
  private cronExpressionSchema: z.ZodSchema<string>

  constructor(cronLib: typeof cron) {
    this.cron = cronLib
    this.cronExpressionSchema = schema
  }

  public scheduleTask = (cronExpression: string, task: (now: Date | 'manual' | 'init') => void) => {
    if (!this.isValidCronExpression(cronExpression)) {
      throw new Error(`Invalid cron expression : ${cronExpression}`)
    }
    this.cron.schedule(cronExpression, task)
    return this
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
