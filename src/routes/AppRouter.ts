import { Router } from 'express'
import { AuthRouter } from './AuthRouter.js'
import { TaskRouter } from './TaskRouter.js'
import { UserRouter } from './UserRouter.js'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    // prettier-ignore
    router
      .use("/tasks", TaskRouter.routes)
      .use("/auth", AuthRouter.routes)
      .use("/users", UserRouter.routes)

    return router
  }
}
