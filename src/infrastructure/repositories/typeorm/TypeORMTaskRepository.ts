import { Repository } from 'typeorm'
import { AbstractTaskRepository, ITaskEntity, TaskEntity } from '../../../domain/index.js'
import { TaskORMEntity, TypeORMDatabase, UserORMEntity } from '../../database/index.js'

export class TypeORMTaskRepository implements AbstractTaskRepository {
  private repository: Repository<TaskORMEntity>
  private userRepository: Repository<UserORMEntity>

  constructor() {
    this.repository = TypeORMDatabase.getInstance().getRepository(TaskORMEntity)
    this.userRepository = TypeORMDatabase.getInstance().getRepository(UserORMEntity)
  }

  create = async (task: Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITaskEntity> => {
    const user = (await this.userRepository.findOneBy({ id: task.userId })) as UserORMEntity
    const taskEntity = this.repository.create({ ...task, user })
    const createdTask = await this.repository.save(taskEntity)
    return new TaskEntity({ ...createdTask, userId: createdTask.user.id })
  }

  updateById = async (id: string, taskDto: Partial<Omit<ITaskEntity, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>): Promise<boolean> => {
    const updated = await this.repository.update(
      {
        id,
      },
      taskDto,
    )
    return updated.affected === 1
  }

  deleteById = async (id: string): Promise<boolean> => {
    const deleted = await this.repository.delete({
      id,
    })

    return deleted.affected === 1
  }

  getAll = async (userId: string): Promise<ITaskEntity[]> => {
    const tasks = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })

    return tasks.map((task) => new TaskEntity({ ...task, userId }))
  }
}
