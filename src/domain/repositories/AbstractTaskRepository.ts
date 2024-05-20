import { ITaskEntity, TaskEntity } from '../entities/TaskEntity.js'

export abstract class AbstractTaskRepository {
  abstract create(task: Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITaskEntity>

  abstract updateById(
    id: string,
    taskDto: Partial<Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ITaskEntity | null>

  abstract deleteById(id: string): Promise<ITaskEntity | null>

  abstract getAll(): Promise<ITaskEntity[]>
}
