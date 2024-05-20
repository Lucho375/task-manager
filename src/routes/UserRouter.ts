import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'
import { MongooseUserRepository } from '../repositories/MongooseUserRepository.js'

export class UserRouter {
  static get routes(): Router {
    const router = Router()

    const repository = new MongooseUserRepository()
    const controller = new UserController(repository)

    // prettier-ignore

    router
      .put('/users/:id', controller.updateUser)
      .delete('/users/:id', controller.deleteUser)
      .get('/users/:id', controller.getUserById)
      .get('/users/email/:email', controller.getUserByEmail)

    return router
  }
}
