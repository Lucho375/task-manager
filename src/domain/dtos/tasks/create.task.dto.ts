import { z } from 'zod'

const schema = z.object({
  description: z.string(),
  status: z.string().default('pending'),
  title: z.string(),
  userId: z.string(),
})

type TCreateTaskDto = z.infer<typeof schema>

export class CreateTaskDto {
  readonly description: string
  readonly status: string
  readonly title: string
  readonly userId: string

  private constructor({ description, status, title, userId }: TCreateTaskDto) {
    this.description = description
    this.status = status
    this.title = title
    this.userId = userId
  }

  static validate(data: unknown): CreateTaskDto {
    return new CreateTaskDto(schema.parse(data))
  }
}
