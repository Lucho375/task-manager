import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod'
import { CustomError } from '../../domain/index.js'

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log({
    error,
  })

  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ message: error.message })
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).send({ message: 'Invalid token provided' })
  }

  if (error instanceof ZodError) return res.status(400).send(error.issues.map((issue) => ({ [issue.path[0]]: issue.message })))

  return res.status(500).send('Internal Server Error')
}
