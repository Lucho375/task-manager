import { ITaskEntity } from '../interfaces/ITaskEntity.js'
export class TaskEntity {
  public id: string
  public userId: string
  public title: string
  public description: string
  public status: string
  public createdAt: Date
  public updatedAt: Date

  constructor({ id, userId, title, description, status, createdAt, updatedAt }: ITaskEntity) {
    this.id = id
    this.userId = userId
    this.title = title
    this.description = description
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
