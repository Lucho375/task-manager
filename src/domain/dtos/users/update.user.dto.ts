import { z } from 'zod'

const schema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
})

type TUpdateUserDto = z.infer<typeof schema>

export class UpdateUserDto {
  readonly username?: string
  readonly email?: string
  public password?: string

  private constructor({ username, email, password }: TUpdateUserDto) {
    this.username = username
    this.email = email
    this.password = password
  }

  static validate(data: unknown) {
    return new UpdateUserDto(schema.parse(data))
  }
}
