import { Request, Response, NextFunction } from 'express'
import { AbstractTaskRepository } from '../domain/repositories/AbstractTaskRepository.js'

export class TaskController {
  constructor(private readonly taskRepository: AbstractTaskRepository) {}

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = req.body
      const createdTask = await this.taskRepository.create(task)
      return res.status(201).send({ status: 'success', payload: createdTask })
    } catch (error) {
      next(error)
    }
  }

  public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const update = req.body
      const task = await this.taskRepository.updateById(id, update)
      return res.status(200).send({ status: 'success', payload: task })
    } catch (error) {
      next(error)
    }
  }

  public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedTask = await this.taskRepository.deleteById(id)
      return res.status(200).send({ status: 'success', payload: deletedTask })
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskRepository.getAll()
      return res.status(200).send({ status: 'success', payload: tasks })
    } catch (error) {
      next(error)
    }
  }
}
