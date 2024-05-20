import { IUserEntity, UserEntity } from '../domain/entities/UserEntity.js'
import { AbstractUserRepository } from '../domain/repositories/AbstractUserRepository.js'
import { UserModel } from '../models/User.js'

export class MongooseUserRepository implements AbstractUserRepository {
  constructor(private readonly model = UserModel) {}

  private createUserEntity(user: any): IUserEntity {
    return new UserEntity({ ...user.toObject(), id: user._id.toString() })
  }

  async createUser(userData: Partial<IUserEntity>): Promise<IUserEntity> {
    const user = await this.model.create(userData)
    return this.createUserEntity(user)
  }

  async updateUser(userId: string, userData: Partial<IUserEntity>): Promise<IUserEntity | null> {
    const updatedUser = await this.model.findByIdAndUpdate(userId, userData, { new: true })
    return updatedUser ? this.createUserEntity(updatedUser) : null
  }

  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await this.model.findByIdAndDelete(userId)
    return !!deletedUser
  }

  async getUserById(userId: string): Promise<IUserEntity | null> {
    const user = await this.model.findById(userId)
    return user ? this.createUserEntity(user) : null
  }

  async getUserByEmail(email: string): Promise<IUserEntity | null> {
    const user = await this.model.findOne({ email })
    return user ? this.createUserEntity(user) : null
  }
}
