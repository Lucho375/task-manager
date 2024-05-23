import { z } from 'zod'

const schema = z.object({
  description: z.string(),
  completed: z.boolean().default(false),
  title: z.string(),
  userId: z.string(),
})

type TCreateTaskDto = z.infer<typeof schema>

export class CreateTaskDto {
  readonly description: string
  readonly completed: boolean
  readonly title: string
  readonly userId: string

  private constructor({ description, completed, title, userId }: TCreateTaskDto) {
    this.description = description
    this.completed = completed
    this.title = title
    this.userId = userId
  }

  static validate(data: unknown): CreateTaskDto {
    return new CreateTaskDto(schema.parse(data))
  }
}
