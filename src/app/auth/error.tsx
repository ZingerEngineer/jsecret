'use client'

import Link from 'next/link'

export default function NotFound({
  error
}: {
  error: { name: string; message: string }
}) {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-8xl font-semibold text-red-500">ERROR!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            An error occurred!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Error name: {error.name}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Message: {error.message}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
