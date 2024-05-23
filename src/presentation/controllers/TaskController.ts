import { NextFunction, Response } from 'express'
import { AbstractTaskRepository, CreateTaskDto, IAuthenticatedRequest } from '../../domain/index.js'

export class TaskController {
  constructor(private readonly taskRepository: AbstractTaskRepository) {}

  public create = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const task = CreateTaskDto.validate({ ...req.body, userId: req.user?.userId })
      const createdTask = await this.taskRepository.create(task)
      return res.status(201).send({ status: 'success', payload: createdTask })
    } catch (error) {
      next(error)
    }
  }

  public updateOneById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const update = req.body
      const task = await this.taskRepository.updateById(id, update)
      if (!task) return res.status(400).send({ status: 'failed', message: `Task with id ${id} not exists!` })
      return res.status(200).send({ status: 'success', payload: task })
    } catch (error) {
      next(error)
    }
  }

  public deleteOneById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedTask = await this.taskRepository.deleteById(id)
      if (!deletedTask) return res.status(400).send({ status: 'failed', message: `Task with id ${id} not exists!` })
      return res.status(200).send({ status: 'success', payload: deletedTask })
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskRepository.getAll()
      return res.status(200).send({ status: 'success', payload: tasks })
    } catch (error) {
      next(error)
    }
  }
}
