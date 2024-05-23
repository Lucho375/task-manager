import { z } from 'zod'

const schema = z.object({
  tasks: z
    .string()
    .transform((value: string) => value.toLowerCase() === 'true')
    .optional(),
})

type TGetUserDto = z.infer<typeof schema>

export class GetUserDto {
  readonly tasks?: boolean

  private constructor({ tasks }: TGetUserDto) {
    this.tasks = tasks
  }

  static validate(data: unknown) {
    return new GetUserDto(schema.parse(data))
  }
}
