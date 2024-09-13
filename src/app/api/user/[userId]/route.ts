import User from '@/services/db/schemas/user.schema'
import { NextRequest } from 'next/server'
export default async function GET({
  params,
  request
}: {
  params: {
    userId: string
  }
  request: NextRequest
}) {
  const { userId } = params
  const user = User.findById(userId)
  return user
}
