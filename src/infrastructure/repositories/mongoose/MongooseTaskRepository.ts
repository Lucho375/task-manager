import { AbstractTaskRepository, ITaskEntity, TaskEntity } from '../../../domain/index.js'
import { TaskModel, UserModel } from '../../../infrastructure/index.js'

export class MongooseTaskRepository implements AbstractTaskRepository {
  constructor(
    private readonly taskModel = TaskModel,
    private readonly userModel = UserModel,
  ) {}

  create = async (task: Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITaskEntity> => {
    const createdTask = await this.taskModel.create(task)
    await this.userModel.findByIdAndUpdate(task.userId, { $push: { tasks: createdTask._id } })
    return new TaskEntity({ ...createdTask.toObject(), id: createdTask._id.toString() })
  }

  updateById = async (id: string, taskDto: Partial<Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ITaskEntity | null> => {
    const updatedTask = await this.taskModel.findByIdAndUpdate({ id }, taskDto, { new: true })
    if (updatedTask) {
      return new TaskEntity({ ...updatedTask.toObject(), id: updatedTask._id.toString() })
    }
    return null
  }

  deleteById = async (id: string): Promise<ITaskEntity | null> => {
    const deletedTask = await this.taskModel.findByIdAndDelete(id)
    if (deletedTask) return new TaskEntity({ ...deletedTask.toObject(), id: deletedTask._id.toString() })
    return null
  }

  getAll = async (): Promise<ITaskEntity[]> => {
    const tasks = await this.taskModel.find()
    return tasks.map((task) => new TaskEntity({ ...task.toObject(), id: task._id.toString() }))
  }
}
