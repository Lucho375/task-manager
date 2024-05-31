import { NextFunction, Request, Response } from 'express'
import { isProduction } from '../../constants/isProduction.js'
import {
  AbstractHashService,
  AbstractTokenService,
  AbstractUserRepository,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
} from '../../domain/index.js'
import { TokenBlacklistService } from '../../infrastructure/index.js'
import { HTTPResponse } from '../http/HTTPResponse.js'

export class AuthController {
  private tokenBlacklistService: typeof TokenBlacklistService
  constructor(
    private readonly hashService: AbstractHashService,
    private readonly userRepository: AbstractUserRepository,
    private readonly tokenService: AbstractTokenService,
  ) {
    this.tokenBlacklistService = TokenBlacklistService
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password } = RegisterUserDto.validate(req.body)

      const emailExists = await this.userRepository.getUserByEmail(email)
      const userNameExists = await this.userRepository.getUserByUsername(username)

      if (emailExists || userNameExists) {
        CustomError.badRequest('User already exists!')
      }

      const hashedPassword = await this.hashService.hash(password)
      const newUser = await this.userRepository.createUser({ username, email, password: hashedPassword })
      HTTPResponse.success(res, 201, 'User created', { ...newUser })
    } catch (error) {
      next(error)
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = LoginUserDto.validate(req.body)
      const user = await this.userRepository.getUserByEmail(email)
      if (!user) {
        CustomError.unauthorized('Invalid credentials')
      }

      const isPasswordValid = await this.hashService.compare(password, user.password)
      if (!isPasswordValid) {
        CustomError.unauthorized('Invalid credentials')
      }

      const accessToken = await this.tokenService.generateAccessToken({ userId: user.id })
      const refreshToken = await this.tokenService.generateRefreshToken({ userId: user.id })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
      })
      HTTPResponse.success(res, 200, 'login success', { accessToken, ...user })
    } catch (error) {
      next(error)
    }
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers['Authorization']
      const token = (authHeader as string).split(' ')[1]
      await this.tokenBlacklistService.addtoBlacklist(token)
      const { refreshToken } = req.cookies
      await this.tokenBlacklistService.addtoBlacklist(refreshToken)
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
      })
      HTTPResponse.success(res, 200, 'Logout success')
    } catch (error) {
      next(error)
    }
  }
}
