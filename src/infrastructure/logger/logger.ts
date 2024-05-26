import * as winston from 'winston'

export class Logger {
  private logger: winston.Logger

  constructor(options: winston.LoggerOptions) {
    this.logger = winston.createLogger(options)
  }

  public info(message: Record<string, any> | string): void {
    this.logger.info(message)
  }

  public error(message: Record<string, any> | string): void {
    this.logger.error(message)
  }
}
