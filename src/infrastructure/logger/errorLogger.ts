import path from 'path'
import * as winston from 'winston'
import { isProduction } from '../../constants/isProduction.js'
import { Logger } from './logger.js'

const dirname = isProduction ? path.join('dist', 'logs') : path.join('src', 'logs')

export const errorLogger = new Logger({
  level: 'error',
  transports: [new winston.transports.File({ filename: 'errors.log', dirname })],
  format: winston.format.combine(winston.format.prettyPrint()),
})
