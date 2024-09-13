import Project from '@/services/db/schemas/project.schema'
import Secret from '@/services/db/schemas/secret.schema'
import Team from '@/services/db/schemas/team.schema'

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params
  const { secretName, secretValue, selectedTeam, selectedProject } =
    await request.json()
  let teamId: null | string = null
  let projectId: null | string = null
  try {
    if (selectedProject !== 'Roaming') {
      const project = await Project.findOne({ name: selectedProject })
      projectId = project?.toObject()._id.toString()!
    }
    if (selectedTeam !== 'Roaming') {
      const team = await Team.findOne({ name: selectedTeam })
      teamId = team?.toObject()._id.toString()!
    }

    const newSecret = await Secret.create({
      name: secretName,
      value: secretValue,
      userId: userId,
      projectId,
      teamId
    })

    await newSecret.save()
    return new Response(JSON.stringify(newSecret), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    })
  }
}

export async function GET(
  _request: Request,
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
    const secretsForUser = await Secret.find({
      userId
    })
    return new Response(JSON.stringify(secretsForUser), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    })
  }
}
