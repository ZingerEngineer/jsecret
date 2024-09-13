import { TProject } from '@/services/db/schemas/project.schema'
import { getUserProjects } from '../api/getUserProjects'
export default async function RecentProjectsSection({
  params
}: {
  params: {
    userId: string
  }
}) {
  let projects = await getUserProjects(params.userId)
  return (
    <div>
      {projects ? (
        <div>
          <div className="recent-projects-wrapper flex flex-col gap-3 items-center bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-card w-full bg-orange-500/50 p-4 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
              >
                <div className="project-card-title text-2xl">
                  {project.name}
                </div>
                <div className="project-card-description text-sm">
                  {project.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
