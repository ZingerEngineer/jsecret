import { TProject } from '@/services/db/schemas/project.schema'

export async function getUserProjects(userId: string) {
  let projectsResponse: Response
  try {
    projectsResponse = await fetch(
      `http://localhost:3000/api/projects/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return (await projectsResponse.json()) as TProject[]
  } catch (error) {
    console.error(error)
  }
}
