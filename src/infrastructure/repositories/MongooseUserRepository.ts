import { UserEntity } from '../../domain/entities/UserEntity.js'
import { IUserEntity } from '../../domain/interfaces/IUserEntity.js'
import { UserModel } from '../../domain/models/User.js'
import { AbstractUserRepository } from '../../domain/repositories/AbstractUserRepository.js'

export class MongooseUserRepository implements AbstractUserRepository {
  constructor(private readonly model = UserModel) {}

  private createUserEntity(user: any): IUserEntity {
    return new UserEntity({ ...user.toObject(), id: user._id.toString() })
  }

  createUser = async (userData: Partial<IUserEntity>): Promise<IUserEntity> => {
    const user = await this.model.create(userData)
    return this.createUserEntity(user)
  }

  updateUser = async (userId: string, userData: Partial<IUserEntity>): Promise<IUserEntity | null> => {
    const updatedUser = await this.model.findByIdAndUpdate(userId, userData, { new: true })
    return updatedUser ? this.createUserEntity(updatedUser) : null
  }

  deleteUser = async (userId: string): Promise<boolean> => {
    const deletedUser = await this.model.findByIdAndDelete(userId)
    return !!deletedUser
  }

  getUserById = async (userId: string): Promise<IUserEntity | null> => {
    const user = await this.model.findById(userId)
    return user ? this.createUserEntity(user) : null
  }

  getUserByEmail = async (email: string): Promise<IUserEntity | null> => {
    const user = await this.model.findOne({ email })
    return user ? this.createUserEntity(user) : null
  }
}
