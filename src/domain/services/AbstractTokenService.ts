export abstract class AbstractTokenService {
  abstract generateAccessToken(payload: Record<string, any>): string
  abstract generateRefreshToken(payload: Record<string, any>): string
  abstract verifyToken<T>(token: string): T
}
