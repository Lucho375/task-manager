import express, { type Express, json, urlencoded } from 'express'
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

  private setupMiddlewares() {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(LoggerMiddleware)
  }

  private setupRoutes() {
    this.app.use(AppRouter.routes)
  }

  private setupErrorHandler() {
    this.app.use(ErrorHandler)
  }

  public listen() {
    this.app.listen(this.port, () => {
      infoLogger.info(`Server running on ${this.port}`)
    })
  }
}
