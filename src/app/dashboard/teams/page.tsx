import { TTeam } from '@/services/db/schemas/team.schema'
import { getUserTeams } from '../api/getUserTeams'

const TeamsSection = async ({
  params
}: {
  params: {
    userId: string
  }
}) => {
  const teams = await getUserTeams(params.userId)
  return (
    <div>
      {teams ? (
        <div className="recent-projects-wrapper flex flex-col gap-3 items-center bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
          {teams.map((team) => (
            <div
              key={team.name}
              className="project-card w-full bg-orange-500/50 p-4 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
            >
              <div className="project-card-title text-2xl">{team.name}</div>
              <div className="project-card-description text-sm">
                {team.description}
              </div>
              <div className="team-members-wrapper flex flex-col items-start justify-center">
                {team.teamMembers.map((member) => (
                  <div
                    key={member}
                    className="team-member"
                  >
                    {member}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default TeamsSection
