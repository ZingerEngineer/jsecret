import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const { Schema } = mongoose

export type TSession = {
  _id: ObjectId
  userId: string
  sessionData: string
  sessionName: string
  softDeleted: boolean
  softDeletedAt: Date
  hardDeleted: boolean
  hardDeletedAt: Date
  updatedAt: Date
  createdAt: Date
}
export const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  sessionName: {
    type: String,
    required: true
  },
  sessionData: {
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

export default mongoose.model('Session', sessionSchema)
