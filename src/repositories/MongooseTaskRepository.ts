import { ITaskEntity, TaskEntity } from '../domain/entities/TaskEntity.js'
import { AbstractTaskRepository } from '../domain/repositories/AbstractTaskRepository.js'
import { TaskModel } from '../models/Task.js'

export class MongooseTaskRepository implements AbstractTaskRepository {
  constructor(private readonly model = TaskModel) {}

  create = async (task: Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITaskEntity> => {
    const createdTask = await this.model.create(task)
    return new TaskEntity({ ...createdTask.toObject(), id: createdTask._id.toString() })
  }
  updateById = async (
    id: string,
    taskDto: Partial<Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ITaskEntity | null> => {
    const updatedTask = await this.model.findByIdAndUpdate({ id }, taskDto, { new: true })
    if (updatedTask) {
      return new TaskEntity({ ...updatedTask.toObject(), id: updatedTask._id.toString() })
    }
    return null
  }

  deleteById = async (id: string): Promise<ITaskEntity | null> => {
    const deletedTask = await this.model.findByIdAndDelete({ id })
    if (deletedTask) return new TaskEntity({ ...deletedTask.toObject(), id: deletedTask._id.toString() })
    return null
  }

  getAll = async (): Promise<ITaskEntity[]> => {
    const tasks = await this.model.find()
    return tasks.map(task => new TaskEntity({ ...task.toObject(), id: task._id.toString() }))
  }
}
