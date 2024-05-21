import { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log({
    error
  })

  if (error instanceof ZodError)
    return res.status(400).send(error.issues.map(issue => ({ [issue.path[0]]: issue.message })))

  return res.status(500).send('Internal Server Error')
}
