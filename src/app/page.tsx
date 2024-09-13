'use client'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="w-full h-full flex gap-2 justify-center items-center flex-col">
        <h1 className="text-3xl">User {session.user.name} logged in</h1>
        <h4>{session.user.email}</h4>
        <Link
          className="p-2 bg-orange-500 border-2 border-orange-600 rounded-md"
          href={`/dashboard/${session.user.id}`}
        >
          Go to dashboard
        </Link>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      Not signed in <br />
      <button
        className="px-8 py-2 bg-indigo-500 rounded-md"
        onClick={() => signIn()}
      >
        Sign in
      </button>
      <button
        className="px-8 py-2 bg-indigo-500 rounded-md"
        onClick={() => signIn('github')}
      >
        Sign in with github
      </button>
    </div>
  )
}
