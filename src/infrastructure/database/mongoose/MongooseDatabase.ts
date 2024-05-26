import mongoose from 'mongoose'
import { IDatabase } from '../../../domain/index.js'

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
      console.log('Connected to mongoose')
    } catch (error) {
      console.log('Error connecting to mongoose', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection.disconnect()
      console.log('Disconnected from mongoose')
    } catch (error) {
      console.log('Error disconnecting from mongoose', error)
      throw error
    }
  }
}
