import { NextFunction, Request, Response } from 'express'
import { AbstractUserRepository } from '../domain/repositories/AbstractUserRepository.js'
import { AbstractHashService } from '../domain/services/AbstractHashService.js'
import { AbstractTokenService } from '../domain/services/AbstractTokenService.js'

export class AuthController {
  constructor(
    private readonly hashService: AbstractHashService,
    private readonly userRepository: AbstractUserRepository,
    private readonly tokenService: AbstractTokenService
  ) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password } = req.body

      const existingUser = await this.userRepository.getUserByEmail(email)

      if (existingUser) {
        res.status(400).send({ message: 'User already exists' })
        return
      }

      const hashedPassword = await this.hashService.hash(password)
      const newUser = await this.userRepository.createUser({ username, email, password: hashedPassword })
      const token = this.tokenService.generateToken({ userId: newUser.id })
      res.status(201).send({ status: 'success', user: newUser, accessToken: token })
    } catch (error) {
      next(error)
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body
      const user = await this.userRepository.getUserByEmail(email)
      if (!user) {
        res.status(401).send({ message: 'Invalid credentials' })
        return
      }

      const isPasswordValid = await this.hashService.compare(password, user.password)
      if (!isPasswordValid) {
        res.status(401).send({ message: 'Invalid credentials' })
        return
      }

      const token = this.tokenService.generateToken({ userId: user.id })

      res.status(200).send({ token, user })
    } catch (error) {
      next(error)
    }
  }
}
