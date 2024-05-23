import { NextFunction, Response } from 'express'
import { AbstractHashService, AbstractUserRepository, GetUserDto, IAuthenticatedRequest, UpdateUserDto } from '../../domain/index.js'

export class UserController {
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly hashService: AbstractHashService,
  ) {}

  public updateUser = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = UpdateUserDto.validate(req.body)
      if (userData.password) {
        userData.password = await this.hashService.hash(userData.password)
      }
      const updatedUser = await this.userRepository.updateUser(req.user?.userId!, userData)
      res.status(200).send(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userRepository.deleteUser(req.user?.userId!)
      res.status(200).send({ message: 'User deleted successfully' })
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { tasks } = GetUserDto.validate(req.query)
      const user = await this.userRepository.getUserById(req.user?.userId!, tasks)
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }
}
