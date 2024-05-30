import bcrypt from 'bcrypt'
import { AbstractHashService } from '../../domain/index.js'

export class HashService implements AbstractHashService {
  async hash(data: string): Promise<string> {
    if (data.trim() === '') throw new Error('Cannot hash an empty string')
    const salt = await bcrypt.genSalt(10)
    const hashedValue = await bcrypt.hash(data, salt)
    return hashedValue
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    if (data.trim() === '' || encrypted.trim() === '') {
      throw new Error('Data and encrypted value cannot be empty')
    }

    return await bcrypt.compare(data, encrypted)
  }
}
