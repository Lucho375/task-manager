import mongoose from 'mongoose'
import { IDatabase } from '../../../domain/index.js'
import { errorLogger, infoLogger } from '../../index.js'

export class MongooseDatabase implements IDatabase {
  private static instance: MongooseDatabase
  private connection!: typeof mongoose
  private constructor() {}

  static getInstance(): MongooseDatabase {
    if (!MongooseDatabase.instance) {
      MongooseDatabase.instance = new MongooseDatabase()
    }
    return MongooseDatabase.instance
  }

  async connect(uri: string): Promise<void> {
    try {
      this.connection = await mongoose.connect(uri)
      infoLogger.info('Connected to mongoose')
    } catch (error) {
      errorLogger.error(`Error connecting to mongoose : ${error}`)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection.disconnect()
      infoLogger.info('Disconnected from mongoose')
    } catch (error) {
      errorLogger.error(`Error disconnecting from mongoose: ${error}`)
      throw error
    }
  }
}
