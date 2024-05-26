import * as winston from 'winston'
import { Logger } from './logger.js'

export const errorLogger = new Logger({
  level: 'error',
  transports: [new winston.transports.File({ filename: 'errors.log', dirname: 'src/logs' })],
  format: winston.format.combine(winston.format.prettyPrint()),
})
