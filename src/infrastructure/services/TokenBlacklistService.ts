import { ITokenPayload } from '../../domain/index.js'
import redisInstance from '../database/RedisClient.js'
import { RedisService } from './RedisService.js'
import { TokenService } from './TokenService.js'

export class TokenBlacklistService {
  private static tokenService = new TokenService()
  private static redisService = new RedisService(redisInstance.getClient())

  static async addtoBlacklist(token: string): Promise<void> {
    const decoded = this.tokenService.verifyToken<ITokenPayload>(token)
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
