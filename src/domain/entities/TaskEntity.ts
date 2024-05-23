import { ITaskEntity } from '../index.js'
export class TaskEntity {
  public id: string
  public userId: string
  public title: string
  public description: string
  public completed: boolean
  public createdAt: Date
  public updatedAt: Date

  constructor({ id, userId, title, description, completed, createdAt, updatedAt }: ITaskEntity) {
    this.id = id
    this.userId = userId
    this.title = title
    this.description = description
    this.completed = completed
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
