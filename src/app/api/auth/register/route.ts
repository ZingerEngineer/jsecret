import { type NextRequest, NextResponse } from 'next/server'
import User from '@/services/db/schemas/user.schema'
import { hash } from 'bcrypt'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const cookiesStore = cookies()
    const { email, password } = await request.json()
    const alreadyExistingUser = await User.findOne({ email: email })
    if (alreadyExistingUser) {
      throw new Error('User already exists')
    }
    const hashedPassword = await hash(password, 10)
    const newUser = new User({
      email: email,
      password: hashedPassword,
      role: 0
    })
    const savedUser = await newUser.save()
    const authorizationToken = sign(
      {
        userId: savedUser._id,
        role: savedUser.role,
        gitHubId: savedUser.userGitHubId,
        email: savedUser.email
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '60d'
      }
    )
    const emailVerificationToken = sign(
      {
        userId: savedUser._id,
        email: savedUser.email
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d'
      }
    )
    cookiesStore.set('Authorization', authorizationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 60
    })
    cookiesStore.set('EmailVerification', emailVerificationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    })
    return new NextResponse(JSON.stringify({ user: savedUser }), {
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500
    })
    // throw new Error('Failed to register user')
  }
}
