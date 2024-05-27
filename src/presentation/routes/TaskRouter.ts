import { Router } from 'express'
import { DB_TYPE } from '../../config/AppConfig.js'
import { TaskRepositoryFactory } from '../../domain/index.js'
import { DatabaseType } from '../../infrastructure/index.js'
import { TaskController } from '../controllers/TaskController.js'

export class TaskRouter {
  static get routes(): Router {
    const router = Router()

    const repository = TaskRepositoryFactory.createRepository(DB_TYPE as DatabaseType)
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
