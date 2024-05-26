import fs from 'fs/promises'
import path from 'path'
import { errorLogger } from '../logger/errorLogger.js'
import { infoLogger } from '../logger/infoLogger.js'

export async function cleanLogs() {
  try {
    const logsDirectory = path.join('src', 'logs')
    const files = await fs.readdir(logsDirectory)

    if (files.length === 0) {
      infoLogger.info('no logs file found')
      return
    }

    for (const file of files) {
      const filePath = path.join(logsDirectory, file)
      await fs.rm(filePath)
    }
    infoLogger.info('logs cleanup completed')
  } catch (error: any) {
    errorLogger.error({ message: error.message, stack: error.stack, name: error.name })
  }
}
