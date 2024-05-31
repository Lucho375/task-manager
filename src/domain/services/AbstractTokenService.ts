export abstract class AbstractTokenService {
  abstract generateAccessToken(payload: Record<string, any>): Promise<string>
  abstract generateRefreshToken(payload: Record<string, any>): Promise<string>
  abstract verifyAccessToken<T>(token: string): Promise<T>
  abstract verifyRefreshToken<T>(token: string): Promise<T>
}
