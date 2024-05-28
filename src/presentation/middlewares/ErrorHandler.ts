import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod'
import { CustomError } from '../../domain/index.js'
import { errorLogger } from '../../infrastructure/index.js'
import { HTTPResponse } from '../http/HTTPResponse.js'

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return HTTPResponse.error(res, error.statusCode, error.message)
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return HTTPResponse.error(res, 401, 'Invalid token provided')
  }

  if (error instanceof ZodError) {
    const issues = error.issues.map((issue) => ({ [issue.path[0]]: issue.message }))
    return HTTPResponse.error(res, 400, 'Validation error', issues)
  }

  errorLogger.error({
    message: error.message,
    stack: error.stack,
    name: error.name,
    clientIP: req.ip,
    userAgent: req.headers['user-agent'],
  })

  return HTTPResponse.error(res, 500, 'Internal Server Error')
}
