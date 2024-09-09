import mongoose, { Model, model } from 'mongoose'
import { ObjectId } from 'mongodb'
const { Schema } = mongoose

export type TSecret = {
  _id: ObjectId
  projectId: string | null
  teamId: string | null
  userId: string
  name: string
  value: string
  softDeleted: boolean
  softDeletedAt: Date
  hardDeleted: boolean
  hardDeletedAt: Date
  updatedAt: Date
  createdAt: Date
}
export const secretSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: false
  },
  teamId: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  softDeleted: {
    type: Boolean,
    default: false
  },
  softDeletedAt: {
    type: Date,
    default: null
  },
  hardDeleted: {
    type: Boolean,
    default: false
  },
  hardDeletedAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
const Secret =
  (mongoose?.models?.Secret as Model<TSecret>) ||
  model<TSecret>('Secret', secretSchema)

export default Secret
