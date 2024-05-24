export class CustomError extends Error {
  private constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }

  static badRequest(message: string): never {
    throw new CustomError(message, 400)
  }

  static unauthorized(message: string): never {
    throw new CustomError(message, 401)
  }

  static forbidden(message: string): never {
    throw new CustomError(message, 403)
  }

  static notFound(message: string): never {
    throw new CustomError(message, 404)
  }

  static internalServer(message: string = 'Internal Server Error'): never {
    throw new CustomError(message, 500)
  }
}
