import { DatabaseType, MongooseUserRepository } from '../../infrastructure/index.js'
import { TypeORMUserRepository } from '../../infrastructure/repositories/typeorm/TypeORMUserRepository.js'

export class UserRepositoryFactory {
  static createRepository(databaseType: DatabaseType) {
    switch (databaseType) {
      case DatabaseType.MONGO:
        return new MongooseUserRepository()
      case DatabaseType.MYSQL:
        return new TypeORMUserRepository()
      default:
        throw new Error(`Unsupported database type: ${databaseType}`)
    }
  }
}
