import { ITaskEntity } from '../index.js'

export abstract class AbstractTaskRepository {
  abstract create(task: Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITaskEntity>

  abstract updateById(id: string, taskDto: Partial<Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean>

  abstract deleteById(id: string): Promise<boolean>

  abstract getAll(userId: string): Promise<ITaskEntity[]>
}
