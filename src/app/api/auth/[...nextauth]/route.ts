import NextAuth, { Account, DefaultUser, Profile, Session } from 'next-auth'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import User, { TUser } from '../../../../services/db/schemas/user.schema'
import { compare } from 'bcrypt'
import { User as NextAuthUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'
interface ISafeUser extends NextAuthUser {
  id: string
  username: string
  email: string
  role: number
  name: string
  image: string
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
          role: user.role,
          name: user.username,
          profilePicture: user.profilePicture,
          image: user.profilePicture,
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
  callbacks: {
    session(params: { session: Session; token: JWT; user: AdapterUser }) {
      const { session, token, user } = params
      session.user.email = token.email!
      session.user.name = token.name!
      session.user.image = token.image!
      session.user.id = token.id!
      session.user.role = token.role!
      return session
    },
    jwt(params: {
      token: JWT
      user: NextAuthUser | AdapterUser
      account: Account | null
      profile?: Profile | undefined
      trigger?: 'signIn' | 'signUp' | 'update' | undefined
      isNewUser?: boolean | undefined
      session?: any
    }) {
      const { token, user, account, profile, trigger, isNewUser, session } =
        params
      if (user) {
        token.id = user.id
        token.role = user.role
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }

      return token
    }
  },
  secret: process.env.JWT_SECRET
}
const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
