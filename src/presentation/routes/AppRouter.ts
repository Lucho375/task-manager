import { Router } from 'express'
import { AuthRouter } from './AuthRouter.js'
import { TaskRouter } from './TaskRouter.js'
import { UserRouter } from './UserRouter.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { TokenService } from '../../infrastructure/services/TokenService.js'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    const tokenService = new TokenService()
    const authMiddleware = new AuthMiddleware(tokenService)

    // prettier-ignore
    router
      .use("/auth", AuthRouter.routes)
      .use("/tasks", authMiddleware.handle, TaskRouter.routes)
      .use("/users", authMiddleware.handle, UserRouter.routes)

    return router
  }
}
