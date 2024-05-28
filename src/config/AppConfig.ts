import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const AppConfigSchema = z.object({
  PORT: z.string().transform((value) => parseInt(value, 10)),
  DB_URI: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  DB_TYPE: z.enum(['mongo', 'mysql']),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  BACKUP_DIR: z.string().default('backup'),
  REDIS_URL: z.string().url(),
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

  get ACCESS_TOKEN_SECRET(): string {
    return this.config.ACCESS_TOKEN_SECRET
  }

  get REFRESH_TOKEN_SECRET(): string {
    return this.config.REFRESH_TOKEN_SECRET
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

  get REDIS_URL(): string {
    return this.config.REDIS_URL
  }
}

const {
  DB_TYPE,
  DB_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV: NODE_ENV,
  PORT,
  BACKUP_DIR,
  REDIS_URL,
} = AppConfig.getInstance()

export { DB_TYPE, DB_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV, PORT, BACKUP_DIR, REDIS_URL }
