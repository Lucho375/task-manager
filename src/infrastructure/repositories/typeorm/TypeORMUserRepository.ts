import { Repository } from 'typeorm'
import { AbstractUserRepository, IUserEntity, TaskEntity, UserEntity } from '../../../domain/index.js'
import { TypeORMDatabase, UserORMEntity } from '../../database/index.js'

export class TypeORMUserRepository implements AbstractUserRepository {
  private repository!: Repository<UserORMEntity>
  constructor() {
    this.repository = TypeORMDatabase.getInstance().getRepository(UserORMEntity)
  }

  public createUser = async (userData: Partial<IUserEntity>): Promise<IUserEntity> => {
    const data = this.repository.create(userData)
    const createdUser = await this.repository.save(data)

    return new UserEntity({
      ...createdUser,
      tasks: [],
    })
  }

  public updateUser = async (userId: string, userData: Partial<IUserEntity>): Promise<boolean> => {
    const updateResult = await this.repository.update(
      {
        id: userId,
      },
      userData,
    )
    return updateResult.affected === 1
  }

  public deleteUser = async (userId: string): Promise<boolean> => {
    const deleted = await this.repository.delete({
      id: userId,
    })

    return deleted.affected === 1
  }

  public getUserById = async (userId: string, withTasks?: boolean): Promise<IUserEntity | null> => {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      relations: {
        tasks: withTasks,
      },
    })

    if (!user) return null

    return new UserEntity({
      ...user,
      tasks: user.tasks?.map((task) => new TaskEntity({ ...task, userId })),
    })
  }

  public getUserByEmail = async (email: string): Promise<IUserEntity | null> => {
    const user = await this.repository.findOneBy({
      email,
    })

    return user ? new UserEntity({ ...user, tasks: [] }) : null
  }

  public getUserByUsername = async (username: string): Promise<IUserEntity | null> => {
    const user = await this.repository.findOne({
      where: {
        username,
      },
    })

    return user ? new UserEntity({ ...user, tasks: [] }) : null
  }
}
