import mongoose, { Model } from 'mongoose'
import { ObjectId } from 'mongodb'

const { Schema, model } = mongoose

export type TTeam = {
  _id: ObjectId
  teamMembers: string[]
  admins: string[]
  name: string
  description: string
  teamLogo: string
  softDeleted: boolean
  softDeletedAt: Date
  hardDeleted: boolean
  hardDeletedAt: Date
  updatedAt: Date
  createdAt: Date
}
export const teamSchema = new Schema({
  teamMembers: {
    type: [String],
    required: true
  },
  admins: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teamLogo: {
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

const Team =
  (mongoose?.models?.Team as Model<TTeam>) || model<TTeam>('Team', teamSchema)

export default Team
