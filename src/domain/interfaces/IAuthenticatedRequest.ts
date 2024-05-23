import { ITokenPayload } from './ITokenPayload.js'
import { type Request } from 'express'

export interface IAuthenticatedRequest extends Request {
  user?: ITokenPayload
}
