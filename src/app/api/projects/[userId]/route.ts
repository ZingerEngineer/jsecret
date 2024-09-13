import Project from '@/services/db/schemas/project.schema'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params
  }: {
    params: {
      userId: string
    }
  }
) {
  const { userId } = params
  try {
    const projectsForUser = await Project.find({
      ownerUserId: userId
    })
    return new NextResponse(JSON.stringify(projectsForUser), {
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
