import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/AppConfig.js'
import { AbstractTokenService } from '../../domain/index.js'

export class TokenService implements AbstractTokenService {
  private readonly secretKey: string = JWT_SECRET

  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.secretKey)
  }

  verifyToken<T>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.secretKey)
      return decoded as T
    } catch (error) {
      throw error
    }
  }
}
