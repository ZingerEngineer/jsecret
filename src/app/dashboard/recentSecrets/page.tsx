'use client'
import { TSecret } from '@/services/db/schemas/secret.schema'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { getUserSecrets } from '../api/getUserSecrets'
import { MouseEvent } from 'react'

const RecentSecretsSection = ({
  secrets,
  params
}: {
  secrets: TSecret[]
  params: {
    userId: string
  }
}) => {
  const copySecret = (secret: TSecret) => {
    navigator.clipboard.writeText(`${secret.name}=${secret.value}`)
  }
  return (
    <div>
      {secrets ? (
        <div className="recent-projects-wrapper flex flex-col gap-3 items-center bg-orange-500/20 border-2 border-orange-500 rounded-md p-5">
          {secrets.map((secret) => (
            <div
              key={secret.name}
              className="secret-card w-full bg-orange-500/50 p-4 rounded-md cursor-pointer border-orange-500 border-2 hover:bg-orange-500/70 duration-150 flex flex-row justify-between items-center"
            >
              <div className="secret-text-data flex flex-row justify-start gap-2">
                <div className="text-3xl">&#10100;</div>
                <div className="secret-name text-2xl">{secret.name}</div>
                <div className="secret-separator text-2xl">:</div>
                <div className="secret-value text-2xl">{secret.value}</div>
                <div className="text-3xl">&#10101;</div>
              </div>
              <div className="secret-operations-buttons">
                <button
                  onClick={(event) => copySecret(secret)}
                  className="p-1 border-2 border-orange-600 rounded-md hover:bg-orange-400 hover:border-orange-400 duration-150 "
                >
                  <ClipboardDocumentListIcon
                    aria-hidden="true"
                    className="h-6 w-6 pointer-events-none"
                  />
                </button>
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

export default RecentSecretsSection
