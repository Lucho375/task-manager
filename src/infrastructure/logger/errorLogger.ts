import path from 'path'
import * as winston from 'winston'
import { NODE_ENV } from '../../config/AppConfig.js'
import { ENODE_ENV } from '../../domain/enums/NODE_ENV.js'
import { Logger } from './logger.js'

const dirname = NODE_ENV === ENODE_ENV.Production ? path.join('dist', 'logs') : path.join('src', 'logs')

export const errorLogger = new Logger({
  level: 'error',
  transports: [new winston.transports.File({ filename: 'errors.log', dirname })],
  format: winston.format.combine(winston.format.prettyPrint()),
})
