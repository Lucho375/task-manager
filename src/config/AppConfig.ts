import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const AppConfigSchema = z.object({
  PORT: z.string().transform((value) => parseInt(value, 10)),
  DATABASE_URI: z.string().url(),
  JWT_SECRET: z.string().min(1),
})

type AppConfigType = z.infer<typeof AppConfigSchema>

class AppConfig {
  private static instance: AppConfig
  private config: AppConfigType

  private constructor() {
    this.config = this.loadConfig()
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig()
    }
    return AppConfig.instance
  }

  private loadConfig(): AppConfigType {
    const envVars = process.env
    try {
      return AppConfigSchema.parse(envVars)
    } catch (error) {
      console.error('Error loading environment variables :', error)
      process.exit(1)
    }
  }

  get PORT(): number {
    return this.config.PORT
  }

  get DATABASE_URI(): string {
    return this.config.DATABASE_URI
  }

  get JWT_SECRET(): string {
    return this.config.JWT_SECRET
  }
}

export const appConfig = AppConfig.getInstance()
