import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { IDatabase } from '../../../domain/index.js'
import { TaskORMEntity } from './models/Task.js'
import { UserORMEntity } from './models/User.js'

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
        logging: true,
        entities: [TaskORMEntity, UserORMEntity],
        subscribers: [],
        migrations: [],
        url: uri,
      })
      await this.datasource.initialize()
      console.log(`Connected to ${this.datasource.options.type}`)
    } catch (error) {
      console.error('Error connecting to MySQL database:', error)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.datasource.destroy()
      console.log(`Disconnected from ${this.datasource.options.type}`)
    } catch (error) {
      console.error('Error disconnecting from MySQL database:', error)
      throw error
    }
  }

  public getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.datasource.getRepository(target)
  }
}
