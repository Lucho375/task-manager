import { ITaskEntity } from './ITaskEntity.js'

export interface IUserEntity {
  id: string
  username: string
  email: string
  password: string
  tasks: ITaskEntity[]
  createdAt: Date
  updatedAt: Date
}
