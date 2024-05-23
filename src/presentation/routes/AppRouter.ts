import { Router } from 'express'
import { TokenService } from '../../infrastructure/index.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { AuthRouter, TaskRouter, UserRouter } from './index.js'

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
