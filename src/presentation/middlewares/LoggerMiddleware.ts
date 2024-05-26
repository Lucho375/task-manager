import { type NextFunction, type Request, type Response } from 'express'
import { AppConfig } from '../../config/AppConfig.js'
import { infoLogger } from '../../infrastructure/index.js'

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const NODE_ENV = AppConfig.getInstance().NODE_ENV
  if (NODE_ENV === 'development') {
    const { params, body, query } = req
    const auth = req.headers.authorization || req.headers.Authorization
    const clientIP = req.ip || req.connection.remoteAddress

    res.on('finish', () => {
      const message = `${req.method} ${req.url} ${JSON.stringify({ params, body, query, auth, clientIP, statusCode: res.statusCode }, null, 2)}`
      infoLogger.info(message)
    })
  }

  next()
}
