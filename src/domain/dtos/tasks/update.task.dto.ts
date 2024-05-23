import { z } from 'zod'

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
})

type TUpdateTaskDto = z.infer<typeof updateTaskSchema>

export class UpdateTaskDto {
  readonly title?: string
  readonly description?: string
  readonly completed?: boolean

  private constructor({ title, description, completed }: TUpdateTaskDto) {
    this.title = title
    this.description = description
    this.completed = completed
  }

  static validate(data: unknown) {
    return new UpdateTaskDto(updateTaskSchema.parse(data))
  }
}
