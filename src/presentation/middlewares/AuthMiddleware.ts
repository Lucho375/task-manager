import { type NextFunction, type Response } from 'express'
import { AbstractTokenService, IAuthenticatedRequest, ITokenPayload } from '../../domain/index.js'
import { TokenBlacklistService } from '../../infrastructure/services/TokenBlacklistService.js'
import { HTTPResponse } from '../http/HTTPResponse.js'

export class AuthMiddleware {
  private tokenBlacklistService: typeof TokenBlacklistService
  constructor(private readonly tokenService: AbstractTokenService) {
    this.tokenBlacklistService = TokenBlacklistService
  }

  handle = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers['Authorization']
      if (!authHeader) return HTTPResponse.error(res, 401, 'No token provided')

      const token = (authHeader as string).split(' ')[1]

      const isTokenBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token)
      if (isTokenBlacklisted) return HTTPResponse.error(res, 401, 'Token has been invalidated')
      const decoded = await this.tokenService.verifyAccessToken<ITokenPayload>(token)
      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
  }
}
