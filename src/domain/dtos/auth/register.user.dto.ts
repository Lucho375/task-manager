import { z } from 'zod'

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type TRegisterUserDto = z.infer<typeof schema>

export class RegisterUserDto {
  readonly username: string
  readonly email: string
  readonly password: string

  private constructor({ username, email, password }: TRegisterUserDto) {
    this.username = username
    this.email = email
    this.password = password
  }

  static validate(data: unknown) {
    return new RegisterUserDto(schema.parse(data))
  }
}
