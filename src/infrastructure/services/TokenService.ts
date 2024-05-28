import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/AppConfig.js'
import { AbstractTokenService } from '../../domain/index.js'

export class TokenService implements AbstractTokenService {
  private readonly ACCESS_SECRET: string = ACCESS_TOKEN_SECRET
  private readonly REFRESH_SECRET: string = REFRESH_TOKEN_SECRET

  generateAccessToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.ACCESS_SECRET, { expiresIn: 600 })
  }

  generateRefreshToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn: 1200 })
  }

  verifyToken<T>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.ACCESS_SECRET)
      return decoded as T
    } catch (error) {
      throw error
    }
  }
}
