import { type Request } from 'express'
import { ITokenPayload } from './ITokenPayload.js'

export interface IAuthenticatedRequest extends Request {
  user?: ITokenPayload
}
