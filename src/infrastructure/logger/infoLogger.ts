import path from 'path'
import * as winston from 'winston'
import { NODE_ENV } from '../../config/AppConfig.js'
import { ENODE_ENV } from '../../domain/enums/NODE_ENV.js'
import { Logger } from './logger.js'

const dirname = NODE_ENV === ENODE_ENV.Production ? path.join('dist', 'logs') : path.join('src', 'logs')

export const infoLogger = new Logger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, message, level }) =>
            `[${new Date(timestamp).toLocaleDateString()} - ${new Date(timestamp).toLocaleTimeString()}] [${level.toUpperCase()}] ${message}`,
        ),
        winston.format.colorize({
          all: true,
          colors: {
            info: 'blue',
          },
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'info.log',
      dirname,
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    }),
  ],
})
