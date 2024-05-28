import { type NextFunction, type Response } from 'express'
import { AbstractTokenService, IAuthenticatedRequest, ITokenPayload } from '../../domain/index.js'
import { TokenBlacklistService } from '../../infrastructure/services/TokenBlacklistService.js'

export class AuthMiddleware {
  private tokenBlacklistService: typeof TokenBlacklistService
  constructor(private readonly tokenService: AbstractTokenService) {
    this.tokenBlacklistService = TokenBlacklistService
  }

  handle = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers['Authorization']
      if (!authHeader) return res.status(401).send({ status: 'error', message: 'no token provided' })

      const token = (authHeader as string).split(' ')[1]

      const isTokenBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token)
      if (isTokenBlacklisted) return res.status(401).send({ status: 'error', message: 'Token has been invalidated' })

      const decoded = this.tokenService.verifyToken<ITokenPayload>(token)
      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
  }
}
