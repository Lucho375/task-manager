import redisInstance from '../database/RedisClient.js'

export async function initializeRedis() {
  await redisInstance.connect()
  return redisInstance.getClient()
}
