'use client'
import DropDown from '@/components/DropDownComponent'
import InputComponent from '@/components/InputComponent'
import { useState } from 'react'
import { TProject } from '@/services/db/schemas/project.schema'
import { TTeam } from '@/services/db/schemas/team.schema'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { BoltIcon } from '@heroicons/react/24/solid'
type SecretCreatorSectionProps = {
  projectsArray: TProject[]
  teamsArray: TTeam[]
}
const SecretCreatorSection = ({
  projectsArray,
  teamsArray
}: SecretCreatorSectionProps) => {
  const { data: session } = useSession()
  const createSecret = async (
    secretName: string,
    secretValue: string,
    selectedProject: string,
    selectedTeam: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/secrets/${session?.user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            secretName,
            secretValue,
            selectedProject,
            selectedTeam
          })
        }
      )
      if (res.ok) {
        toast('Secret created successfully!', {
          type: 'success'
        })
      }
    } catch (error) {
      toast("Secret couldn't be created!", {
        type: 'error'
      })
    }
  }

  const [secretName, setSecretName] = useState('')
  const [secretValue, setSecretValue] = useState('')
  const [selectedProject, setSelectedProject] = useState('Roaming')
  const [selectedTeam, setSelectedTeam] = useState('Roaming')
  return (
    <div className="recent-projects-wrapper flex flex-col gap-3 items-start bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
      <h1 className="secret-creator-title text-xl font-bold flex flex-row items-center gap-2">
        <span>
          <BoltIcon className="w-6 h-6" />
        </span>
        Secret on the fly!
      </h1>
      <div className="secret-repo-secetion w-full my-4">
        <div className="secret-drop-downs flex flex-row gap-2">
          <div className="secret-repo-title text-lg font-semibold">
            Project:
          </div>
          <DropDown
            itemsList={projectsArray}
            onSelect={(project: string) => setSelectedProject(project)}
          />
          <div className="secret-repo-title text-lg font-semibold">Team:</div>
          <DropDown
            itemsList={teamsArray}
            onSelect={(team: string) => setSelectedTeam(team)}
          />
        </div>
      </div>
      <div className="secret-inputs-wrapper flex flex-row gap-2 w-full">
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
      <button
        className="create-secret-button bg-orange-500/50 p-2 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150"
        onClick={() =>
          createSecret(secretName, secretValue, selectedProject, selectedTeam)
        }
      >
        Create Secret
      </button>
    </div>
  )
}

export default SecretCreatorSection
