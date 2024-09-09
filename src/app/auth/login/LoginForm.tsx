'use client'

import InputComponent from '@/components/InputComponent'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
export default function LoginForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  const doLogin = async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password: value
      })
      if (res?.ok) {
        toast.success('Login success')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="form-wrapper flex flex-col justify-center items-center max-w-60">
        <h1 className="text-xl font-bold">Login</h1>
        <InputComponent
          props={{
            labelHtmlFor: 'email',
            labelText: 'Email',
            inputId: 'email',
            inputName: 'email',
            inputType: 'email',
            inputPlaceholder: 'johndoe@example.com',
            value: email,
            onChange(event) {
              handleChange(event, setEmail)
            }
          }}
        />
        <InputComponent
          props={{
            labelHtmlFor: 'password',
            labelText: 'Password',
            inputId: 'password',
            inputName: 'password',
            inputType: 'password',
            inputPlaceholder: '●●●●●●●●',
            value: value,
            onChange(event) {
              handleChange(event, setValue)
            }
          }}
        />
        <button
          onClick={doLogin}
          className="w-full px-6 py-3"
        >
          Login
        </button>
      </div>
    </div>
  )
}
