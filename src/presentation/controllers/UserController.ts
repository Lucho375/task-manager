import { NextFunction, Response } from 'express'
import {
  AbstractHashService,
  AbstractUserRepository,
  CustomError,
  GetUserDto,
  IAuthenticatedRequest,
  UpdateUserDto,
} from '../../domain/index.js'
import { HTTPResponse } from '../http/HTTPResponse.js'

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
      await this.userRepository.updateUser(req.user?.userId!, userData)
      HTTPResponse.success(res, 200, 'User updated')
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleted = await this.userRepository.deleteUser(req.user?.userId!)

      if (!deleted) {
        CustomError.badRequest(`User with id ${req.user?.userId} not exists`)
      }
      HTTPResponse.success(res, 200, 'User deleted')
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { tasks } = GetUserDto.validate(req.query)
      const user = await this.userRepository.getUserById(req.user?.userId!, tasks)
      if (!user) CustomError.badRequest(`User with id ${req.user?.userId} not exists`)

      HTTPResponse.success(res, 200, undefined, { ...user })
    } catch (error) {
      next(error)
    }
  }
}
