import { Router } from 'express'
import { MongooseUserRepository } from '../../infrastructure/repositories/MongooseUserRepository.js'
import { UserController } from '../controllers/UserController.js'

export class UserRouter {
  static get routes(): Router {
    const router = Router()

    const repository = new MongooseUserRepository()
    const controller = new UserController(repository)

    // prettier-ignore

    router
      .put('/:id', controller.updateUser)
      .delete('/:id', controller.deleteUser)
      .get('/:id', controller.getUserById)

    return router
  }
}
