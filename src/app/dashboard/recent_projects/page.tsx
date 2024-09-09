'use client'
import { useRouter } from 'next/navigation'
interface IProject {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const RecentProjectsSection = ({
  props
}: {
  props: {
    projects: IProject[]
  }
}) => {
  const router = useRouter()

  return (
    <div className="recent-projects-wrapper flex flex-col gap-3 items-center bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
      {props.projects.map((project) => (
        <div
          key={project.id}
          className="project-card w-full bg-orange-500/50 p-4 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
          onClick={() => router.push(`/project/${project.id}`)}
        >
          <div className="project-card-title text-2xl">{project.name}</div>
          <div className="project-card-description text-sm">
            {project.description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentProjectsSection
