import express, { type Express, urlencoded, json } from 'express'
import { AppRouter } from '../routes/AppRouter.js'

export class AppExpress {
  private readonly app: Express
  private readonly port: number
  constructor(port: number) {
    this.app = express()
    this.port = port
    this.setupMiddlewares()
    this.setupRoutes()
  }

  private setupMiddlewares() {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
  }

  private setupRoutes() {
    this.app.use(AppRouter.routes)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on ${this.port}`)
    })
  }
}
