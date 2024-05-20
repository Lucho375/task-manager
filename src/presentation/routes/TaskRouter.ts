import { Router } from 'express'
import { TaskController } from '../controllers/TaskController.js'
import { MongooseTaskRepository } from '../../infrastructure/repositories/MongooseTaskRepository.js'

export class TaskRouter {
  static get routes(): Router {
    const router = Router()

    const repository = new MongooseTaskRepository()
    const controller = new TaskController(repository)

    // prettier-ignore
    router
      .delete("/:id", controller.deleteOneById)
      .get("/", controller.getAll)
      .post("/", controller.create)
      .put("/:id", controller.updateOneById)

    return router
  }
}
