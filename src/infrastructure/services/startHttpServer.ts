import { PORT } from '../../config/AppConfig.js'
import { AppExpress } from '../../presentation/application/AppExpress.js'

export async function startHttpServer() {
  const app = new AppExpress(PORT)
  app.listen()
}
