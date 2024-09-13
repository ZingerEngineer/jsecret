import { TSecret } from '@/services/db/schemas/secret.schema'

export const getUserSecrets = async (userId: string) => {
  try {
    const secretsRes = await fetch(
      `http://localhost:3000/api/secrets/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (secretsRes.status === 200) {
      return (await secretsRes.json()) as TSecret[]
    }
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}
