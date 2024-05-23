import { Router } from 'express'
import { MongooseTaskRepository } from '../../infrastructure/index.js'
import { TaskController } from '../controllers/TaskController.js'

export class TaskRouter {
  static get routes(): Router {
    const router = Router()

    const repository = new MongooseTaskRepository()
    const controller = new TaskController(repository)

    // prettier-ignore
    router
      .route('/')
      .get(controller.getAll)
      .post(controller.create)

    // prettier-ignore
    router
      .route('/:id')
      .delete(controller.deleteOneById)
      .put(controller.updateOneById)

    return router
  }
}
