export abstract class AbstractTokenService {
  abstract generateToken(payload: Record<string, any>): string
  abstract verifyToken<T>(token: string): T
}
