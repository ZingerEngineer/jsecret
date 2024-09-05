'use client'

import InputComponent from '@/components/InputComponent'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import User from '@/services/db/schemas/user.schema'
export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }
  const register = () => {
    User.create({
      email,
      password: value
    })
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
            value: value,
            onChange(event) {
              handleChange(event, setValue)
            }
          }}
        />
        <button
          onClick={() => register}
          className="w-full px-6 py-3"
        >
          Register
        </button>
      </div>
    </div>
  )
}
