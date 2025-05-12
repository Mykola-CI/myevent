'use client'
import { Input } from '@heroui/react'
import Link from 'next/link'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from './SubmitButton'
import { signinUser, type ActionResponse } from '@/actions/auth'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: {},
  error: undefined,
}

const SigninForm = () => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState, formData) => {
    const result = await signinUser(prevState, formData)

    if (result.success) {
      // Navigate to the dashboard on success
      router.push('/dashboard')
    }

    return result
  }, initialState)

  return (
    <form className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 ">
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      {state.errors?.email && (
        <p className="text-red-500">{state.errors.email.join(', ')}</p>
      )}
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      {state.errors?.password && (
        <p className="text-red-500">{state.errors.password.join(', ')}</p>
      )}
      <SubmitButton label={'Sign In'} isLoading={isPending} />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
    </form>
  )
}

export default SigninForm
