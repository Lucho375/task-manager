import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type TLoginUserDto = z.infer<typeof schema>

export class LoginUserDto {
  readonly email: string
  readonly password: string

  private constructor({ email, password }: TLoginUserDto) {
    this.email = email
    this.password = password
  }

  static validate(data: unknown) {
    return new LoginUserDto(schema.parse(data))
  }
}
