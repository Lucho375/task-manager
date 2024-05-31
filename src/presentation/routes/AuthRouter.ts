import { Router } from 'express'
import { ACCESS_EXPIRES_IN, ACCESS_TOKEN_SECRET, DB_TYPE, REFRESH_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '../../config/AppConfig.js'
import { UserRepositoryFactory } from '../../domain/index.js'
import { DatabaseType, HashService, TokenService } from '../../infrastructure/index.js'
import { AuthController } from '../controllers/AuthController.js'

export class AuthRouter {
  static get routes(): Router {
    const router = Router()

    const hashService = new HashService()
    const repository = UserRepositoryFactory.createRepository(DB_TYPE as DatabaseType)
    const tokenService = new TokenService(ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN)
    const controller = new AuthController(hashService, repository, tokenService)

    // prettier-ignore
    router
    .post('/login', controller.login)
    .get('/logout', controller.logout)
    .post('/register', controller.register)

    return router
  }
}
