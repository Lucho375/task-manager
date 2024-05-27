import { Router } from 'express'
import { DB_TYPE } from '../../config/AppConfig.js'
import { UserRepositoryFactory } from '../../domain/index.js'
import { DatabaseType, HashService, TokenService } from '../../infrastructure/index.js'
import { AuthController } from '../controllers/AuthController.js'

export class AuthRouter {
  static get routes(): Router {
    const router = Router()

    const hashService = new HashService()
    const repository = UserRepositoryFactory.createRepository(DB_TYPE as DatabaseType)
    const tokenService = new TokenService()
    const controller = new AuthController(hashService, repository, tokenService)

    // prettier-ignore
    router
    .post('/login', controller.login)
    .get('/logout', controller.logout)
    .post('/register', controller.register)

    return router
  }
}
