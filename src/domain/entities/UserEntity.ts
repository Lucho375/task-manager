import { ITaskEntity, IUserEntity } from '../index.js'

export class UserEntity {
  public id: string
  public createdAt: Date
  public updatedAt: Date
  public username: string
  public email: string
  public password: string
  public tasks: ITaskEntity[]

  constructor({ id, createdAt, updatedAt, username, email, password, tasks }: IUserEntity) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.username = username
    this.email = email
    this.password = password
    this.tasks = tasks
  }
}
