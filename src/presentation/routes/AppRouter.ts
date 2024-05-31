import { Router } from 'express'
import { ACCESS_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '../../config/AppConfig.js'
import { TokenService } from '../../infrastructure/index.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { AuthRouter, TaskRouter, UserRouter } from './index.js'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    const tokenService = new TokenService(ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN)
    const authMiddleware = new AuthMiddleware(tokenService)

    // prettier-ignore
    router
      .use("/auth", AuthRouter.routes)
      .use("/tasks", authMiddleware.handle, TaskRouter.routes)
      .use("/users", authMiddleware.handle, UserRouter.routes)

    return router
  }
}
