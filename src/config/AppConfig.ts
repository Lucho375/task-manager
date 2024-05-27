import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const AppConfigSchema = z.object({
  PORT: z.string().transform((value) => parseInt(value, 10)),
  DB_URI: z.string().url(),
  JWT_SECRET: z.string().min(1),
  DB_TYPE: z.enum(['mongo', 'mysql']),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  BACKUP_DIR: z.string().default('backup'),
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
      throw error
    }
  }

  get PORT(): number {
    return this.config.PORT
  }

  get DB_URI(): string {
    return this.config.DB_URI
  }

  get JWT_SECRET(): string {
    return this.config.JWT_SECRET
  }

  get DB_TYPE(): string {
    return this.config.DB_TYPE
  }

  get NODE_ENV(): string {
    return this.config.NODE_ENV
  }

  get BACKUP_DIR(): string {
    return this.config.BACKUP_DIR
  }
}

const { DB_TYPE, DB_URI, JWT_SECRET, NODE_ENV: NODE_ENV, PORT, BACKUP_DIR } = AppConfig.getInstance()

export { DB_TYPE, DB_URI, JWT_SECRET, NODE_ENV, PORT, BACKUP_DIR }
