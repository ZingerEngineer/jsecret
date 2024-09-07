'use client'

import InputComponent from '@/components/InputComponent'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }
  const handleRegister = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password: password })
      })
      console.log(res)
      if (res.status === 200) {
        router.push('/auth/login')
      } else {
        throw new Error('User registeration failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="form-wrapper flex flex-col justify-center items-center max-w-60">
        <h1 className="text-xl font-bold">Register</h1>
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
            value: password,
            onChange(event) {
              handleChange(event, setPassword)
            }
          }}
        />
        <button
          onClick={handleRegister}
          className="w-full px-6 py-3"
        >
          Register
        </button>
      </div>
    </div>
  )
}
