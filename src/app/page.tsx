'use client'
import NavBar from '@/components/NavBar'
import { useSession, signIn, signOut } from 'next-auth/react'
export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <NavBar />
      </>
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
