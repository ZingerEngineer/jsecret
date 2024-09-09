'use client'
import { useRouter } from 'next/navigation'
interface ITeam {
  id: string
  name: string
  teamMembers: string[]
  projects: string[]
  teamAdmins: string[]
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const TeamsSection = ({
  props
}: {
  props: {
    teams: ITeam[]
  }
}) => {
  const router = useRouter()

  return (
    <div className="recent-projects-wrapper flex flex-col gap-3 items-center bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
      {props.teams.map((team) => (
        <div
          key={team.id}
          className="project-card w-full bg-orange-500/50 p-4 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
          onClick={() => router.push(`/team/${team.id}`)}
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
  )
}

export default TeamsSection
