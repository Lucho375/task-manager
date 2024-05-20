import { Router } from 'express'
import { MongooseUserRepository } from '../../infrastructure/repositories/MongooseUserRepository.js'
import { HashService } from '../../infrastructure/services/HashService.js'
import { TokenService } from '../../infrastructure/services/TokenService.js'
import { AuthController } from '../controllers/AuthController.js'

export class AuthRouter {
  static get routes(): Router {
    const router = Router()

    const hashService = new HashService()
    const userRepository = new MongooseUserRepository()
    const tokenService = new TokenService()
    const controller = new AuthController(hashService, userRepository, tokenService)

    // prettier-ignore
    router
      .use("/register", controller.register)
      .use("/login", controller.login )

    return router
  }
}
