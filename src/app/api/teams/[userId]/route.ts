import Team from '@/services/db/schemas/team.schema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log(`userId: ${params.userId}`)
  try {
    const teamsForUser = await Team.find({
      teamMembers: { $in: [params.userId] }
    })
    console.log(`Teams for users${teamsForUser}`)
    return new NextResponse(JSON.stringify(teamsForUser), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ message: 'An error occurred' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    })
  }
}
