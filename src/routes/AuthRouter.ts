import { Router } from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { MongooseUserRepository } from '../repositories/MongooseUserRepository.js'
import { HashService } from '../services/HashService.js'
import { TokenService } from '../services/TokenService.js'

export class AuthRouter {
  static get routes(): Router {
    const router = Router()

    const hashService = new HashService()
    const userRepository = new MongooseUserRepository()
    const tokenService = new TokenService('SECRET_JWT_123123')
    const controller = new AuthController(hashService, userRepository, tokenService)

    // prettier-ignore
    router
      .use("/register", controller.register)
      .use("/login", controller.login )

    return router
  }
}
