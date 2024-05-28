import { type Response } from 'express'

export class HTTPResponse {
  static success(res: Response, statusCode: number, message?: string, payload?: Record<string, any>) {
    return res.status(statusCode).send({ status: 'success', message, payload })
  }

  static error(res: Response, statusCode: number, message: string, errors?: Record<string, any>) {
    return res.status(statusCode).send({ status: 'error', message, errors })
  }
}
