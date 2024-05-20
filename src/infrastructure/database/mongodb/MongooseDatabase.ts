import mongoose from 'mongoose'

export class MongooseDatabase {
  static async connect(uri: string) {
    try {
      await mongoose.connect(uri)
      console.log('Connected to mongoose')
    } catch (err) {
      console.log('Error connecting to mongoose', err)
    }
  }
}
