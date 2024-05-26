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

  public createUser = async (userData: Partial<IUserEntity>): Promise<IUserEntity> => {
    const user = await this.model.create(userData)
    return this.createUserEntity(user)
  }

  public updateUser = async (userId: string, userData: Partial<IUserEntity>): Promise<boolean> => {
    const updatedUser = await this.model.findByIdAndUpdate(userId, userData, { new: true })
    return updatedUser !== null
  }

  public deleteUser = async (userId: string): Promise<boolean> => {
    const deletedUser = await this.model.findByIdAndDelete(userId)
    return deletedUser !== null
  }

  public getUserById = async (userId: string, withTasks: boolean): Promise<IUserEntity | null> => {
    const user = await this.model.findById(userId)
    if (!user) return null
    if (withTasks) return this.createUserEntity(await user.populate('tasks'), withTasks)
    return this.createUserEntity(user)
  }

  public getUserByEmail = async (email: string): Promise<IUserEntity | null> => {
    const user = await this.model.findOne({ email })
    return user ? this.createUserEntity(user) : null
  }

  public getUserByUsername = async (username: string): Promise<IUserEntity | null> => {
    const user = await this.model.findOne({ username })
    return user ? this.createUserEntity(user) : null
  }
}
