import { type NextFunction, type Response } from 'express'
import { AbstractTokenService, IAuthenticatedRequest, ITokenPayload } from '../../domain/index.js'

export class AuthMiddleware {
  constructor(private readonly tokenService: AbstractTokenService) {}

  handle = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers['Authorization']
      if (!authHeader) return res.status(401).send({ status: 'error', message: 'no token provided' })

      const token = (authHeader as string).split(' ')[1]
      const decoded = this.tokenService.verifyToken<ITokenPayload>(token)
      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
  }
}
