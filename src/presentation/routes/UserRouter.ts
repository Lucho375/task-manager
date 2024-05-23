import { Router } from 'express'
import { HashService, MongooseUserRepository } from '../../infrastructure/index.js'
import { UserController } from '../controllers/UserController.js'

export class UserRouter {
  static get routes(): Router {
    const router = Router()

    const repository = new MongooseUserRepository()
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
