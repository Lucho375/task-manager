import { RedisClientType } from 'redis'

export class RedisService {
  constructor(private client: RedisClientType) {}

  public set = async (key: string, value: string, expirationInSeconds?: number) => {
    if (expirationInSeconds) {
      await this.client.set(key, value, { EX: expirationInSeconds })
      return
    }
    await this.client.set(key, value)
  }

  public get = async (key: string): Promise<string | null> => {
    return this.client.get(key)
  }

  public del = async (key: string): Promise<void> => {
    await this.client.del(key)
  }

  public exists = async (key: string): Promise<boolean> => {
    const result = await this.client.exists(key)
    return result === 1
  }
}
