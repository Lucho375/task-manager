import { createClient, RedisClientType } from 'redis'
import { REDIS_URL } from '../../config/AppConfig.js'
import { errorLogger } from '../logger/errorLogger.js'
import { infoLogger } from '../logger/infoLogger.js'

class RedisClient {
  private client: RedisClientType
  private static instance: RedisClient

  private constructor(url: string) {
    this.client = createClient({ url })
    this.client.on('error', (err) => console.error('Redis Client Error', err))
  }

  public static getInstance = (url: string) => {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(url)
    }
    return RedisClient.instance
  }

  public connect = async () => {
    try {
      await this.client.connect()
      infoLogger.info('Connected to Redis Client')
    } catch (error) {
      errorLogger.error({ error, message: 'Failed to connect to Redis Client' })
    }
  }

  public disconnect = async () => {
    try {
      await this.client.disconnect()
      infoLogger.info('Disconnected from Redis Client')
    } catch (error) {
      errorLogger.error({ error, message: 'Failed to disconnect from Redis Client' })
    }
  }

  public getClient = () => {
    return this.client
  }
}

const redisInstance = RedisClient.getInstance(REDIS_URL)
export default redisInstance
