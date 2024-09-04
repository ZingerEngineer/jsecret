import { connect } from '@/services/db/index'
import User from '@/services/db/schemas/user.schema'
import GitHubProvider from 'next-auth/providers/github'
import type {
  NextAuthOptions,
  User as NextUser,
  Session as NextSession
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export interface ISafeSession extends NextSession {
  id: string
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
interface ISafeUser extends NextUser {
  id: string
  username: string
  email: string
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

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_APP_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, _req): Promise<ISafeUser | null> {
        try {
          await connect()
          const user = await User.findOne({ email: credentials?.email }).select(
            '+password'
          )

          if (!user) {
            throw new Error('Wrong Email')
          }

          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password
          )

          if (!passwordMatch) {
            throw new Error('Wrong Password')
          }
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            emailVerified: user.emailVerified,
            emailVerifiedAt: user.emailVerifiedAt,
            softDeleted: user.softDeleted,
            softDeletedAt: user.softDeletedAt,
            hardDeleted: user.hardDeleted,
            hardDeletedAt: user.hardDeletedAt,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  }
}

export default authOptions
