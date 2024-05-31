import { AbstractTokenService } from '../../domain/index.js'
import { TokenService } from '../../infrastructure/index.js'

describe('TokenService', () => {
  let tokenService: AbstractTokenService

  beforeAll(() => {
    tokenService = new TokenService('ACCESS_SECRET', 'REFRESH_SECRET', 1, 1)
  })

  describe('generateAccessToken()', () => {
    it('should generate an access token', async () => {
      const accessToken = await tokenService.generateAccessToken({ user: 'user' })
      expect(typeof accessToken).toBe('string')
    })

    it('should throw with an empty payload', async () => {
      expect(async () => await tokenService.generateAccessToken({})).rejects.toThrow('Payload cannot be empty')
    })

    it('should expire in 1 second', async () => {
      const accessToken = await tokenService.generateAccessToken({ user: 'user' })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      expect(async () => await tokenService.verifyAccessToken(accessToken)).rejects.toThrow('jwt expired')
    })
  })

  describe('generateRefreshToken()', () => {
    it('should generate a refresh token', async () => {
      const refreshToken = await tokenService.generateRefreshToken({ user: 'user' })
      expect(typeof refreshToken).toBe('string')
    })

    it('should throw with an empty payload', async () => {
      expect(async () => await tokenService.generateRefreshToken({})).rejects.toThrow('Payload cannot be empty')
    })

    it('should expire in 1 second', async () => {
      const accessToken = await tokenService.generateRefreshToken({ user: 'user' })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      expect(async () => await tokenService.verifyRefreshToken(accessToken)).rejects.toThrow('jwt expired')
    })
  })

  describe('verifyAccessToken()', () => {
    it('should verify correctly a valid access token', async () => {
      const token = await tokenService.generateAccessToken({ user: 'username' })
      const decoded = await tokenService.verifyAccessToken<{ user: 'string' }>(token)
      expect(decoded.user).toBe('username')
    })

    it('should throw with invalid signature()', async () => {
      const validToken = await tokenService.generateAccessToken({ user: 'username' })
      const [header, payload, signature] = validToken.split('.')
      const invalidSignature = signature.slice(0, -1) + (signature.slice(-1) === 'a' ? 'b' : 'a')
      const invalidToken = `${header}.${payload}.${invalidSignature}`
      expect(async () => await tokenService.verifyAccessToken(invalidToken)).rejects.toThrow('invalid signature')
    })
  })

  describe('verifyRefreshToken', () => {
    it('should verify correctly a valid refresh token', async () => {
      const token = await tokenService.generateRefreshToken({ user: 'username' })
      const decoded = await tokenService.verifyRefreshToken<{ user: 'string' }>(token)
      expect(decoded.user).toBe('username')
    })

    it('should throw with invalid signature', async () => {
      const validToken = await tokenService.generateRefreshToken({ user: 'username' })
      const [header, payload, signature] = validToken.split('.')
      const invalidSignature = signature.slice(0, -1) + (signature.slice(-1) === 'a' ? 'b' : 'a')
      const invalidToken = `${header}.${payload}.${invalidSignature}`
      expect(async () => await tokenService.verifyRefreshToken(invalidToken)).rejects.toThrow('invalid signature')
    })
  })
})
