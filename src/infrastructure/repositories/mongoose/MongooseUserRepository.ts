import { Document } from 'mongoose'
import { AbstractUserRepository, ITaskEntity, IUserEntity, TaskEntity, UserEntity } from '../../../domain/index.js'
import { UserModel } from '../../../infrastructure/index.js'

export class MongooseUserRepository implements AbstractUserRepository {
  constructor(private readonly model = UserModel) {}

  private createUserEntity(user: Document<unknown, {}, IUserEntity>, withTasks?: boolean): IUserEntity {
    return new UserEntity({
      ...user.toObject(),
      id: user.id.toString(),
      tasks: withTasks ? user.toObject().tasks?.map((task: ITaskEntity) => new TaskEntity(task)) : undefined!,
    })
  }

  createUser = async (userData: Partial<IUserEntity>): Promise<IUserEntity> => {
    if (await this.model.findOne({ username: userData.username })) {
      throw new Error(`User ${userData.username} already exists!`)
    }
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

  getUserById = async (userId: string, withTasks: boolean): Promise<IUserEntity | null> => {
    const user = await this.model.findById(userId)
    if (!user) return null
    if (withTasks) return this.createUserEntity(await user.populate('tasks'), withTasks)
    return this.createUserEntity(user)
  }

  getUserByEmail = async (email: string): Promise<IUserEntity | null> => {
    const user = await this.model.findOne({ email })
    return user ? this.createUserEntity(user) : null
  }
}
