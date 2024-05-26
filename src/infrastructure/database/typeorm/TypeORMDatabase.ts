import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { IDatabase } from '../../../domain/index.js'
import { TaskORMEntity } from './models/Task.js'
import { UserORMEntity } from './models/User.js'
import { infoLogger } from '../../logger/infoLogger.js'
import { errorLogger } from '../../logger/errorLogger.js'

export class TypeORMDatabase implements IDatabase {
  private static instance: TypeORMDatabase
  private datasource!: DataSource

  private constructor() {}

  static getInstance(): TypeORMDatabase {
    if (!TypeORMDatabase.instance) {
      TypeORMDatabase.instance = new TypeORMDatabase()
    }
    return TypeORMDatabase.instance
  }

  public async connect(uri: string): Promise<void> {
    try {
      this.datasource = new DataSource({
        type: 'mysql',
        synchronize: true,
        logging: false,
        entities: [TaskORMEntity, UserORMEntity],
        subscribers: [],
        migrations: [],
        url: uri,
      })
      await this.datasource.initialize()
      infoLogger.info(`Connected to ${this.datasource.options.type}`)
    } catch (error) {
      errorLogger.error(`Error connecting to MySQL database: ${error}`)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.datasource.destroy()
      infoLogger.info(`Disconnected from ${this.datasource.options.type}`)
    } catch (error) {
      errorLogger.error(`Error disconnecting from MySQL database: ${error}`)
      throw error
    }
  }

  public getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.datasource.getRepository(target)
  }
}
