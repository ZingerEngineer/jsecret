import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../../services/db/schemas/user.schema'
import { compare } from 'bcrypt'
import { User as NextAuthUser } from 'next-auth'

interface ISafeUser extends NextAuthUser {
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

export const nextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error' // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required.')
        }

        // Find the user in the database
        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          throw new Error('No user found with this email.')
        }

        // Verify the password
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )
        if (!isPasswordValid) {
          throw new Error('Invalid password.')
        }

        // Check if the user is soft or hard deleted
        if (user.softDeleted || user.hardDeleted) {
          throw new Error('Your account is no longer active.')
        }

        // Structure the safe user data
        const safeUser: ISafeUser = {
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

        return safeUser
      }
    }),
    Github({
      clientId: process.env.GITHUB_APP_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.JWT_SECRET
}
const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
