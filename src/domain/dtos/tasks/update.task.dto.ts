import { z } from 'zod'

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
})

type TUpdateTaskInput = z.infer<typeof updateTaskSchema>

export class UpdateTaskInput {
  readonly title?: string
  readonly description?: string
  readonly completed?: boolean

  private constructor({ title, description, completed }: TUpdateTaskInput) {
    this.title = title
    this.description = description
    this.completed = completed
  }

  static validate(data: unknown) {
    return new UpdateTaskInput(updateTaskSchema.parse(data))
  }
}
