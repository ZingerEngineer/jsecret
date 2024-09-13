import RecentProjectsSection from '../recentProjects/page'
import SecretCreatorSection from '../secrets/page'
import TeamsSection from '../teams/page'
import { getUserProjects } from '../api/getUserProjects'
import { getUserTeams } from '../api/getUserTeams'
import RecentSecretsSection from '../recentSecrets/page'
import { getUserSecrets } from '../api/getUserSecrets'
const DashBoard = async ({
  params
}: {
  params: {
    userId: string
  }
}) => {
  const { userId } = params
  const teamsArray = await getUserTeams(userId)
  const projectsArray = await getUserProjects(userId)
  const secrets = await getUserSecrets(userId)
  return (
    <div className="dashboard-wrapper w-full h-full flex flex-row p-6 gap-6">
      <div className="w-4/6 h-full flex flex-col gap-6">
        {projectsArray && teamsArray ? (
          <SecretCreatorSection
            projectsArray={projectsArray}
            teamsArray={teamsArray}
          />
        ) : (
          <div>Loading...</div>
        )}
        <RecentSecretsSection
          secrets={secrets}
          params={{ userId }}
        />
      </div>
      <div className="flex flex-col gap-6 w-2/6 h-full">
        <RecentProjectsSection params={{ userId }} />
        <TeamsSection params={{ userId }} />
      </div>
    </div>
  )
}

export default DashBoard
