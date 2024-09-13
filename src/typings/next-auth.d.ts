import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      role: number
      email: string
      name: string
      image: string
    } & DefaultSession['user']
  }
  interface User {
    id: string
    emailVerified: boolean
    role: number
    email: string
    name: string
    image: string
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    id: string
    role: number
    email: string
    name: string
    image: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: number
    email: string
    name: string
    image: string
  }
}
