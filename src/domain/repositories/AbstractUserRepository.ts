import { IUserEntity } from '../index.js'

export abstract class AbstractUserRepository {
  abstract createUser(userData: Partial<IUserEntity>): Promise<IUserEntity>

  abstract updateUser(userId: string, userData: Partial<IUserEntity>): Promise<boolean>

  abstract deleteUser(userId: string): Promise<boolean>

  abstract getUserById(userId: string, withTasks?: boolean): Promise<IUserEntity | null>

  abstract getUserByEmail(email: string): Promise<IUserEntity | null>

  abstract getUserByUsername(username: string): Promise<IUserEntity | null>
}
