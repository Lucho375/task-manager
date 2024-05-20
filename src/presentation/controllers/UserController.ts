import { Request, Response, NextFunction } from 'express'
import { AbstractUserRepository } from '../../domain/repositories/AbstractUserRepository.js'

export class UserController {
  constructor(private readonly userRepository: AbstractUserRepository) {}

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userData = req.body
      const updatedUser = await this.userRepository.updateUser(id, userData)
      if (!updatedUser) {
        res.status(404).send({ message: 'User not found' })
        return
      }
      res.status(200).send(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const deleted = await this.userRepository.deleteUser(id)
      if (!deleted) {
        res.status(404).send({ message: 'User not found' })
        return
      }
      res.send({ message: 'User deleted successfully' })
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.userRepository.getUserById(id)

      if (!user) {
        res.status(404).send({ message: 'User not found' })
        return
      }

      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }
}
