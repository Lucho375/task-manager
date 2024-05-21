import { model, Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

export const TaskModel = model('Task', taskSchema)
