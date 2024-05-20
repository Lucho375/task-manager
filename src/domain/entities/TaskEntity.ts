export interface ITaskEntity {
  id: string
  userId: string
  title: string
  description: string
  status: string
  categories: string[]
  createdAt: Date
  updatedAt: Date
}

export class TaskEntity {
  public id: string
  public userId: string
  public title: string
  public description: string
  public status: string
  public categories: string[]
  public createdAt: Date
  public updatedAt: Date

  constructor({ id, userId, title, description, status, categories, createdAt, updatedAt }: ITaskEntity) {
    this.id = id
    this.userId = userId
    this.title = title
    this.description = description
    this.status = status
    this.categories = categories
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
