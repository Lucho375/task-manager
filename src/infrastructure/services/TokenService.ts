import jwt from 'jsonwebtoken'
import { AbstractTokenService } from '../../domain/index.js'

export class TokenService implements AbstractTokenService {
  /**
   *
   * @param {string} accessSecret - Secret key for signin access tokens
   * @param {string} refreshSecret - Secret key for signin refresh tokens
   * @param {string} accessExpiresIn - Time expiration in seconds for access token
   * @param {string} refreshExpiresIn  Time expiration in seconds for refresh token
   */
  constructor(
    private readonly accessSecret: string,
    private readonly refreshSecret: string,
    private readonly accessExpiresIn: number,
    private readonly refreshExpiresIn: number,
  ) {}

  private validatePayload(payload: Record<string, any>) {
    if (!payload || Object.keys(payload).length === 0) throw new Error('Payload cannot be empty')
  }

  generateAccessToken = async (payload: Record<string, any>): Promise<string> => {
    this.validatePayload(payload)
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn }, (err, encoded) => {
        if (err) return reject(err)
        return resolve(encoded as string)
      })
    })
  }

  generateRefreshToken = async (payload: Record<string, any>): Promise<string> => {
    this.validatePayload(payload)
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn }, (err, encoded) => {
        if (err) return reject(err)
        return resolve(encoded as string)
      })
    })
  }

  verifyAccessToken = async <T>(token: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.accessSecret, (err, decoded) => {
        if (err) return reject(err)
        return resolve(decoded as T)
      })
    })
  }

  verifyRefreshToken = async <T>(token: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.refreshSecret, (err, decoded) => {
        if (err) return reject(err)
        return resolve(decoded as T)
      })
    })
  }
}
