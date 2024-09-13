import mongoose, { Model } from 'mongoose'
import { ObjectId } from 'mongodb'

const { Schema, model } = mongoose

export type TProject = {
  _id: ObjectId
  name: string
  description: string
  ownerUserId: string[]
  participantsIds: string[]
  projectLogo: string
  softDeleted: boolean
  softDeletedAt: Date
  hardDeleted: boolean
  hardDeletedAt: Date
  updatedAt: Date
  createdAt: Date
}
export const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ownerUserId: {
    type: String,
    required: true
  },
  participantsIds: {
    type: [String],
    default: []
  },
  projectLogo: {
    type: String,
    default: null
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

const Project =
  (mongoose?.models?.Project as Model<TProject>) ||
  model<TProject>('Project', projectSchema)

export default Project
