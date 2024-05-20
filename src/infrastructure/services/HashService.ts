import bcrypt from 'bcrypt'
import { AbstractHashService } from '../../domain/services/AbstractHashService.js'

export class HashService implements AbstractHashService {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hashedValue = await bcrypt.hash(data, salt)
    return hashedValue
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted)
  }
}
