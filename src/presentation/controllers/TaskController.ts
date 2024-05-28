import { NextFunction, Response } from 'express'
import { AbstractTaskRepository, CreateTaskDto, CustomError, IAuthenticatedRequest, UpdateTaskDto } from '../../domain/index.js'
import { HTTPResponse } from '../http/HTTPResponse.js'

export class TaskController {
  constructor(private readonly taskRepository: AbstractTaskRepository) {}

  public create = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const task = CreateTaskDto.validate({ ...req.body, userId: req.user?.userId })
      const createdTask = await this.taskRepository.create(task)
      HTTPResponse.success(res, 201, 'Task created', { ...createdTask })
    } catch (error) {
      next(error)
    }
  }

  public updateOneById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const update = UpdateTaskDto.validate(req.body)
      const task = await this.taskRepository.updateById(id, update)
      if (!task) {
        CustomError.badRequest(`Task with id ${id} not exists`)
      }
      HTTPResponse.success(res, 200, 'Task updated')
    } catch (error) {
      next(error)
    }
  }

  public deleteOneById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedTask = await this.taskRepository.deleteById(id)
      if (!deletedTask) {
        CustomError.badRequest(`Task with id ${id} not exists`)
      }
      HTTPResponse.success(res, 200, 'Task deleted')
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskRepository.getAll(req.user?.userId!)
      HTTPResponse.success(res, 200, undefined, { tasks })
    } catch (error) {
      next(error)
    }
  }
}
