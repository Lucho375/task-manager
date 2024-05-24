import { MongooseDatabase } from './mongoose/MongooseDatabase.js'
import { TypeORMDatabase } from './typeorm/TypeORMDatabase.js'

export enum DatabaseType {
  MONGO = 'mongo',
  MYSQL = 'mysql',
}

export class DatabaseFactory {
  static create(type: DatabaseType) {
    switch (type) {
      case DatabaseType.MONGO:
        return MongooseDatabase.getInstance()
      case DatabaseType.MYSQL:
        return TypeORMDatabase.getInstance()
      default:
        throw new Error(`Unsupported database type: ${type}`)
    }
  }
}
