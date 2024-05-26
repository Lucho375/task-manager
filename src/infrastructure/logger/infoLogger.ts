import * as winston from 'winston'
import { Logger } from './logger.js'

export const infoLogger = new Logger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, message, level }) =>
            `[${new Date(timestamp).toLocaleDateString()} - ${new Date(timestamp).toLocaleTimeString()}] ${level} ${message}`,
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
      dirname: 'src/logs',
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    }),
  ],
})
