import { DatabaseType, MongooseTaskRepository } from '../../infrastructure/index.js'
import { TypeORMTaskRepository } from '../../infrastructure/repositories/typeorm/TypeORMTaskRepository.js'

export class TaskRepositoryFactory {
  static createRepository(databaseType: DatabaseType) {
    switch (databaseType) {
      case DatabaseType.MONGO:
        return new MongooseTaskRepository()
      case DatabaseType.MYSQL:
        return new TypeORMTaskRepository()
      default:
        throw new Error(`Unsupported database type: ${databaseType}`)
    }
  }
}
