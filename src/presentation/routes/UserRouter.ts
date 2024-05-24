import { Router } from 'express'
import { appConfig } from '../../config/AppConfig.js'
import { UserRepositoryFactory } from '../../domain/index.js'
import { DatabaseType, HashService } from '../../infrastructure/index.js'
import { UserController } from '../controllers/UserController.js'

export class UserRouter {
  static get routes(): Router {
    const router = Router()

    const repository = UserRepositoryFactory.createRepository(appConfig.DB_TYPE as DatabaseType)
    const hashService = new HashService()
    const controller = new UserController(repository, hashService)

    // prettier-ignore

    router
      .put('/', controller.updateUser)
      .delete('/', controller.deleteUser)
      .get('/', controller.getUserById)

    return router
  }
}
