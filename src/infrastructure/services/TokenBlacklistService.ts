import { ACCESS_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '../../config/AppConfig.js'
import { ITokenPayload } from '../../domain/index.js'
import redisInstance from '../database/RedisClient.js'
import { RedisService } from './RedisService.js'
import { TokenService } from './TokenService.js'

export class TokenBlacklistService {
  private static tokenService = new TokenService(ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN)
  private static redisService = new RedisService(redisInstance.getClient())

  static async addtoBlacklist(token: string): Promise<void> {
    const decoded = await this.tokenService.verifyAccessToken<ITokenPayload>(token)
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    const remainingTime = decoded.exp - currentTimeInSeconds
    if (remainingTime > 0) {
      await this.redisService.set(token, 'invalid', remainingTime)
    }
  }

  static async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisService.exists(token)
    return result
  }
}
