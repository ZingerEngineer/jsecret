import { TTeam } from '@/services/db/schemas/team.schema'

export async function getUserTeams(userId: string) {
  let teamsResponse: Response
  try {
    teamsResponse = await fetch(`http://localhost:3000/api/teams/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return (await teamsResponse.json()) as TTeam[]
  } catch (error) {
    console.error(error)
  }
}
