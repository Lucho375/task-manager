import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { infoLogger } from '../../infrastructure/index.js'
import { ErrorHandler } from '../middlewares/ErrorHandler.js'
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware.js'
import { AppRouter } from '../routes/index.js'

export class AppExpress {
  private readonly app: Express
  private readonly port: number
  constructor(port: number) {
    this.app = express()
    this.port = port
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandler()
  }

  private setupMiddlewares(): void {
    this.app.use(cors())
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(LoggerMiddleware)
  }

  private setupRoutes(): void {
    this.app.use(AppRouter.routes)
  }

  private setupErrorHandler(): void {
    this.app.use(ErrorHandler)
  }

  public listen(): Server<typeof IncomingMessage, typeof ServerResponse> {
    return this.app.listen(this.port, () => {
      infoLogger.info(`Server running on port ${this.port}`)
    })
  }
}
