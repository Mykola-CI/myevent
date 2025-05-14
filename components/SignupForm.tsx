'use client'

import { registerUser, type ActionResponse } from '@/actions/auth'
import { Input } from '@heroui/react'
import Link from 'next/link'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from './SubmitButton'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: {},
  error: undefined,
}

const SignupForm = () => {
  // const router = useRouter()
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState, formData) => {
    const result = await registerUser(prevState, formData)

    // if (result.success) {
    //   // Navigate to the dashboard on success
    //   router.push('/dashboard')
    // }

    return result

    
  }, initialState)

  return (
    <>
      {isPending && <p>Processing your request...</p>}
      <form
        action={formAction}
        className={`bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 ${
          isPending ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <h3 className="my-4">Sign up</h3>
        <Input fullWidth size="lg" placeholder="Email" name="email" required />
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email.join(', ')}</p>
        )}
        <Input
          name="password"
          fullWidth
          size="lg"
          type="password"
          placeholder="Password"
          required
        />
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password.join(', ')}</p>
        )}
        <SubmitButton label={'Sign up'} isLoading={isPending} />
        <div>
          <Link href="/signin">{`Already have an account?`}</Link>
        </div>
      </form>
    </>
  )
}

export default SignupForm
