import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const { Schema } = mongoose

export type TUser = {
  _id: ObjectId
  role: number
  username: string
  email: string
  password: string
  profilePicture: string
  emailVerified: boolean
  emailVerifiedAt: Date
  softDeleted: boolean
  softDeletedAt: Date
  hardDeleted: boolean
  hardDeletedAt: Date
  updatedAt: Date
  createdAt: Date
}
export const userSchema = new Schema({
  userGitHubId: {
    type: String,
    default: null
  },
  role: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    default: 'guest',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerifiedAt: {
    type: Date,
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

export default mongoose.model('User', userSchema)
