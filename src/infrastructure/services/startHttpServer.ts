import { PORT } from '../../config/AppConfig.js'
import { AppExpress } from '../../presentation/application/AppExpress.js'

export function startHttpServer() {
  const app = new AppExpress(PORT)
  return app.listen()
}
