import jwt from 'jsonwebtoken'
import { AbstractTokenService } from '../../domain/services/AbstractTokenService.js'
import { appConfig } from '../../config/AppConfig.js'

export class TokenService implements AbstractTokenService {
  private readonly secretKey: string = appConfig.JWT_SECRET

  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.secretKey)
  }

  verifyToken<T>(token: string): T | null {
    try {
      const decoded = jwt.verify(token, this.secretKey)
      return decoded as T
    } catch (error) {
      return null
    }
  }
}
