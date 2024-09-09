import RecentProjectsSection from './recent_projects/page'
import SecretCreatorSection from './secrets/page'
import TeamsSection from './teams/page'
const DashBoard = () => {
  const projects = [
    {
      id: '1',
      name: 'Project 1',
      description: 'This is project 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    },
    {
      id: '2',
      name: 'Project 2',
      description: 'This is project 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }
  ]
  const teams = [
    {
      id: '1',
      name: 'Team 1',
      teamMembers: ['1', '2'],
      projects: ['1', '2'],
      teamAdmins: ['1'],
      description: 'This is team 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    },
    {
      id: '2',
      name: 'Team 2',
      teamMembers: ['1', '2'],
      projects: ['1', '2'],
      teamAdmins: ['1'],
      description: 'This is team 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }
  ]
  return (
    <div className="dashboard-wrapper w-full h-full flex flex-row p-6 gap-6">
      <div className="w-4/6 h-full">
        <SecretCreatorSection />
      </div>
      <div className="flex flex-col gap-6 w-2/6 h-full">
        <RecentProjectsSection props={{ projects }} />
        <TeamsSection props={{ teams }} />
      </div>
    </div>
  )
}

export default DashBoard
