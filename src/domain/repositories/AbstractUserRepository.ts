import { IUserEntity } from '../entities/UserEntity.js'

export abstract class AbstractUserRepository {
  abstract createUser(userData: Partial<IUserEntity>): Promise<IUserEntity>

  abstract updateUser(userId: string, userData: Partial<IUserEntity>): Promise<IUserEntity | null>

  abstract deleteUser(userId: string): Promise<boolean>

  abstract getUserById(userId: string): Promise<IUserEntity | null>

  abstract getUserByEmail(email: string): Promise<IUserEntity | null>
}
