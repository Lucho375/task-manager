import { Request, Response, NextFunction } from 'express'

export class TaskController {
  constructor(private readonly taskRepository: any) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error)
    }
  }

  updateOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error)
    }
  }

  deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error)
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error)
    }
  }
}
