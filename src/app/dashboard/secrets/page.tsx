'use client'
import DropDown from '@/components/DropDownComponent'
import InputComponent from '@/components/InputComponent'
import Secret from '@/services/db/schemas/secret.schema'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import User from '@/services/db/schemas/user.schema'
import Project from '@/services/db/schemas/project.schema'
import Team from '@/services/db/schemas/team.schema'
const SecretCreatorSection = () => {
  const { data: session } = useSession()

  const createSecret = async () => {
    const user = await User.findOne({ email: session?.user?.email })
    const project = await Project.findOne({ name: selectedProject })
    const team = await Team.findOne({ name: selectedTeam })
    const newSecret = await Secret.create({
      name: secretName,
      value: secretValue,
      userId: user?._id,
      projectId: project?._id,
      teamId: team?._id
    })
    await newSecret.save()
  }

  const dropDownItemsList = [
    {
      label: 'Roaming'
    },
    {
      label: 'Project 1'
    },
    {
      label: 'Project 2'
    },
    {
      label: 'Project 3'
    }
  ]
  const dropDownTeamsList = [
    {
      label: 'Roaming'
    },
    {
      label: 'Team 1'
    },
    {
      label: 'Team 2'
    },
    {
      label: 'Team 3'
    }
  ]
  const router = useRouter()
  const [secretName, setSecretName] = useState('')
  const [secretValue, setSecretValue] = useState('')
  const [selectedProject, setSelectedProject] = useState('Roaming')
  const [selectedTeam, setSelectedTeam] = useState('Roaming')
  return (
    <div className="recent-projects-wrapper flex flex-col gap-3 items-start bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
      <h1 className="secret-creator-title text-xl font-bold">
        Secret on the fly!
      </h1>
      <div className="secret-repo-secetion w-full my-4">
        <div className="secret-drop-downs flex flex-row gap-2">
          <div className="secret-repo-title text-lg font-semibold">
            Project:
          </div>
          <DropDown
            onSelect={(item) => setSelectedProject(item)}
            props={{ dropDownItemsList }}
          />
          <div className="secret-repo-title text-lg font-semibold">Team:</div>
          <DropDown
            onSelect={(team) => setSelectedTeam(team)}
            props={{ dropDownItemsList: dropDownTeamsList }}
          />
        </div>
      </div>
      <div className="secret-inputs-wrapper flex flex-row gap-2">
        <InputComponent
          props={{
            labelHtmlFor: 'secret-name',
            labelText: 'key name',
            inputId: 'secret-name',
            inputName: 'secret-name',
            inputType: 'text',
            inputPlaceholder: 'foo',
            value: secretName,
            onChange(event) {
              setSecretName((event.target as HTMLInputElement).value)
            }
          }}
        />
        <InputComponent
          props={{
            labelHtmlFor: 'secret-value',
            labelText: 'Value',
            inputId: 'secret-value',
            inputName: 'secret-value',
            inputType: 'text',
            inputPlaceholder: 'bar',
            value: secretValue,
            onChange(event) {
              setSecretValue((event.target as HTMLInputElement).value)
            }
          }}
        />
      </div>
      <div className="operations-wrapper">
        <button
          className="create-secret-button bg-orange-500/50 p-2 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
          onClick={() => {
            createSecret()
          }}
        >
          Create Secret
        </button>
      </div>
    </div>
  )
}

export default SecretCreatorSection
