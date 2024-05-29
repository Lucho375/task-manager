import { NODE_ENV } from '../config/AppConfig.js'
import { ENODE_ENV } from '../domain/index.js'

export const isProduction = NODE_ENV === ENODE_ENV.Production
